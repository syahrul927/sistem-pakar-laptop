import { type GetServerSidePropsContext } from "next";
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import Credentials from "next-auth/providers/credentials";
import { verify } from "argon2";
import { loginSchema } from "~/common/validation/auth";
import { User } from "@prisma/client";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            type: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                const usr = token.user as User;
                session.user.type = usr.type;
                session.user.id = typeof usr.id === "string" ? usr.id : "";
                // session.user.role = user.role; <-- put other properties on the session here
            }
            return session;
        },
    },
    adapter: PrismaAdapter(prisma),
    secret: env.NEXTAUTH_SECRET || "",
    session: {
        strategy: "jwt",
        maxAge: 15 * 24 * 30 * 60, // 15 days
    },
    providers: [
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            httpOptions: {
                timeout: 40000,
            },
        }),
        Credentials({
            id: "credentials",
            type: "credentials",
            name: "Admin",
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "your.example@email.com",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const creds = await loginSchema.parseAsync(credentials);
                const user = await prisma.user.findFirst({
                    where: {
                        email: creds.email,
                    },
                });
                if (!user || !user.password) {
                    return null;
                }
                const isValidPassword = await verify(
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    user.password,
                    creds?.password
                );

                if (!isValidPassword) {
                    return null;
                }
                return user;
            },
        }),
        // GithubProvider({
        //     clientId: env.GITHUB_CLIENT_ID,
        //     clientSecret: env.GITHUB_CLIENT_SECRET,
        // }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
