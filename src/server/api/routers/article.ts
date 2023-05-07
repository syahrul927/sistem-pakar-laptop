import { Article } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { slugGenerator } from "~/utils/StringUtils";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const articleRouter = createTRPCRouter({
    getById: protectedProcedure
        .input(z.string().nullable())
        .query(async ({ ctx, input }) => {
            if (!input)
                throw new TRPCError({
                    code: "BAD_REQUEST",
                });
            return await ctx.prisma.article.findUnique({
                where: {
                    id: input,
                },
            });
        }),
    createOrUpdate: protectedProcedure
        .input(
            z.object({
                id: z.string().nullable(),
                title: z.string(),
                body: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            let article: Article | null = null;
            if (input.id) {
                article = await ctx.prisma.article.findUnique({
                    where: {
                        id: input.id,
                    },
                });
            }
            if (article) {
                article = await ctx.prisma.article.update({
                    data: {
                        id: article.id,
                        title: input.title,
                        body: input.body,
                    },
                    where: {
                        id: article.id,
                    },
                });
            } else {
                const slug = slugGenerator(input.title);
                article = await ctx.prisma.article.create({
                    data: {
                        id: slug,
                        title: input.title,
                        body: input.body,
                    },
                });
            }
            return article;
        }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.article.findMany();
    }),
    deleteById: protectedProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            await ctx.prisma.article.delete({
                where: {
                    id: input,
                },
            });
            return;
        }),
});
