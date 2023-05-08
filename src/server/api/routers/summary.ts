import { createTRPCRouter, protectedProcedure } from "../trpc";

export const summaryRouter = createTRPCRouter({
    getSummary: protectedProcedure.query(async ({ ctx }) => {
        const _case = await ctx.prisma.case.count();
        const sympt = await ctx.prisma.symptom.count();
        const history = await ctx.prisma.historyDiagnosa.count();
        return {
            totalCase: _case,
            totalSymptom: sympt,
            totalHistory: history,
        };
    }),
});
