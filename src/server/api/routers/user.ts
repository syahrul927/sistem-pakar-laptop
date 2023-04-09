import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { hash } from "argon2";

export const userRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const users = await ctx.prisma.user.findMany();
        return users.map((item) => {
            return {
                email: item.email,
                name: item.name,
                id: item.id,
                image: item.image,
            };
        });
    }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existUser = await ctx.prisma.user.findFirst({
                where: {
                    email: input.email,
                },
            });
            if (existUser) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "User dengan email ini sudah terdaftar",
                });
            }
            const hashPass = await hash(input.password);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password, emailVerified, ...user } =
                await ctx.prisma.user.create({
                    data: {
                        name: input.name,
                        email: input.email,
                        password: hashPass,
                        type: "admin",
                    },
                });
            return user;
        }),
});
