import { createTRPCRouter, protectedProcedure } from "../trpc";

export const historyDiagnoseRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return ctx.prisma.historyDiagnosa.findMany({
            include: {
                user: true,
            },
        });
    }),
});
