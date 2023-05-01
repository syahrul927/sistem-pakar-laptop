import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Case } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const caseRouter = createTRPCRouter({
    getById: protectedProcedure
        .input(z.number().nullable())
        .query(async ({ ctx, input }) => {
            if (!input) throw new TRPCError({ code: "BAD_REQUEST" });
            const _case = await ctx.prisma.case.findUnique({
                where: {
                    id: input,
                },
                include: {
                    CaseSymptom: {
                        include: {
                            symptom: true,
                        },
                    },
                },
            });
            return _case;
        }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        return await ctx.prisma.case.findMany({
            include: {
                _count: {
                    select: {
                        CaseSymptom: true,
                    },
                },
            },
        });
    }),
    deleteById: protectedProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.caseSymptom.deleteMany({
                where: {
                    caseId: input,
                },
            });
            await ctx.prisma.case.delete({
                where: { id: input },
            });
            return;
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
                            createMany: {
                                data: symptom.map((item) => ({
                                    symptomId: item,
                                })),
                                skipDuplicates: true,
                            },
                        },
                    },
                    where: {
                        id: _case.id,
                    },
                });
                await ctx.prisma.caseSymptom.deleteMany({
                    where: {
                        caseId: _case.id,
                        symptomId: {
                            notIn: symptom,
                        },
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
