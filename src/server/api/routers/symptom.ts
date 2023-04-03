import { createTRPCRouter, publicProcedure } from "../trpc";

export const symptomRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.symptom.findMany();
    }),
});
