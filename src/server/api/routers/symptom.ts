import { Symptom } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const symptomRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.number().nullable())
        .query(({ ctx, input }) => {
            if (!input) throw new TRPCError({ code: "BAD_REQUEST" });
            return ctx.prisma.symptom.findUnique({
                where: {
                    id: input,
                },
            });
        }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.symptom.findMany();
    }),
    deleteById: protectedProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.caseSymptom.deleteMany({
                where: {
                    symptomId: input,
                },
            });
            await ctx.prisma.symptom.delete({
                where: { id: input },
            });
            return;
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
    createOrUpdate: protectedProcedure
        .input(
            z.object({
                id: z.number().nullable(),
                description: z.string(),
                weight: z.number(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            let sympt: Symptom | null = null;
            if (input.id) {
                sympt = await ctx.prisma.symptom.findUnique({
                    where: {
                        id: input.id,
                    },
                });
            }
            if (sympt) {
                sympt = await ctx.prisma.symptom.update({
                    data: {
                        id: sympt.id,
                        description: input.description,
                        weight: input.weight,
                    },
                    where: {
                        id: sympt.id,
                    },
                });
            } else {
                sympt = await ctx.prisma.symptom.create({
                    data: {
                        description: input.description,
                        weight: input.weight,
                    },
                });
            }
            return sympt;
        }),
});
