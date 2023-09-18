import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const similiaritySchema = z.object({
    caseId: z.number(),
    similiarity: z.number(),
});

type Similarity = z.infer<typeof similiaritySchema>;

export const diagnoseRouter = createTRPCRouter({
    getDiagnose: publicProcedure
        .input(z.string().nullable())
        .query(async ({ ctx, input }) => {
            if (!input) throw new TRPCError({ code: "BAD_REQUEST" });
            const history = await ctx.prisma.historyDiagnosa.findFirst({
                where: {
                    id: input,
                },
                include: {
                    DetailHistoryDiagnosa: {
                        include: {
                            case: true,
                        },
                    },
                },
            });
            if (!history) {
                throw new TRPCError({ code: "NOT_FOUND" });
            }
            const symptoms = await ctx.prisma.symptom.findMany({
                where: {
                    id: {
                        in: history.symptomId,
                    },
                },
            });
            return {
                symptoms: symptoms,
                case: history.DetailHistoryDiagnosa,
            };
        }),
    diagnose: publicProcedure
        .input(z.object({ symptoms: z.array(z.number()) }))
        .mutation(async ({ ctx, input }) => {
            // gejala yang dipilih
            const newCase = input.symptoms;

            // mendapatkan kasus yang pernah terjadi di database
            const allCase = await ctx.prisma.case.findMany({
                include: {
                    CaseSymptom: {
                        include: {
                            symptom: true,
                        },
                    },
                },
            });

            const similiarity: Similarity[] = [];

            // mencari dan menghitung persentase similiarity berdasarkan kasus yang ada dengan gejala yang dipilih
            allCase.forEach((item) => {
                let temp = 0;
                newCase.forEach((i) => {
                    if (item.CaseSymptom.find((s) => s.symptomId === i)) {
                        temp += i;
                    }
                });
                const totalWeight = newCase.reduce((a, b) => a + b);
                const sim = temp / totalWeight;
                similiarity.push({
                    caseId: item.id,
                    similiarity: Number(sim.toFixed(3)) * 100,
                });
            });

            const user = ctx.session?.user;

            // Menyimpan ke dalam history hasil diagnosa
            const history = await ctx.prisma.historyDiagnosa.create({
                data: {
                    symptomId: [...newCase],
                    userId: user?.id,
                    DetailHistoryDiagnosa: {
                        createMany: {
                            data: similiarity
                                .filter((item) => item.similiarity !== 0)
                                .map((item) => ({
                                    similarity: item.similiarity,
                                    caseId: item.caseId,
                                })),
                        },
                    },
                },
            });
            return history.id;
        }),
});
