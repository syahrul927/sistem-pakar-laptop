// middleware.ts
import { User } from "@prisma/client";
import { withAuth } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export default withAuth({
    callbacks: {
        authorized: (param) => {
            const { token } = param;
            if (token) {
                const user = token.user as User;
                return user.type === "admin";
            }
            return false;
        },
    },
});

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/dashboard/:path*",
};
