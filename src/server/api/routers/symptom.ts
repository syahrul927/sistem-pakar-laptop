import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const symptomRouter = createTRPCRouter({
    getAll: protectedProcedure.query(({ ctx }) => {
        return ctx.prisma.symptom.findMany();
    }),
    getByCase: protectedProcedure
        .input(
            z.object({
                caseId: z.number().nullish(),
            })
        )
        .query(({ ctx, input }) => {
            if (!input.caseId) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "case Id null ",
                });
            }
            return ctx.prisma.symptom.findMany({
                where: {
                    CaseSymptom: {
                        some: {
                            caseId: input.caseId,
                        },
                    },
                },
                include: {
                    CaseSymptom: true,
                },
            });
        }),
    create: protectedProcedure
        .input(
            z.object({
                description: z.string(),
                weight: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            return await ctx.prisma.symptom.create({
                data: {
                    description: input.description,
                    weight: input.weight,
                },
            });
        }),
});
