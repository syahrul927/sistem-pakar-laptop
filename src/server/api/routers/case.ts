import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Case } from "@prisma/client";

export const caseRouter = createTRPCRouter({
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.case.findMany();
    }),
    createOrUpdate: protectedProcedure
        .input(
            z.object({
                id: z.number().nullable(),
                problem: z.string(),
                solution: z.string(),
                symptom: z.array(z.number()),
            })
        )
        .mutation(async ({ ctx, input }) => {
            let _case: Case | null = null;
            if (input.id) {
                _case = await ctx.prisma.case.findUnique({
                    where: {
                        id: input.id,
                    },
                });
            }
            const { symptom } = input;
            if (_case) {
                _case = await ctx.prisma.case.update({
                    data: {
                        id: _case.id,
                        problem: input.problem,
                        solution: input.solution,
                        CaseSymptom: {
                            create: symptom.map((item) => ({
                                symptomId: item,
                            })),
                        },
                    },
                    where: {
                        id: _case.id,
                    },
                });
            } else {
                _case = await ctx.prisma.case.create({
                    data: {
                        problem: input.problem,
                        solution: input.solution,
                        date: new Date(),
                        CaseSymptom: {
                            createMany: {
                                data: symptom.map((item) => ({
                                    symptomId: item,
                                })),
                            },
                        },
                    },
                });
            }
            return _case;
        }),
});
