import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { symptomRouter } from "./routers/symptom";
import { userRouter } from "./routers/user";
import { caseRouter } from "./routers/case";
import { diagnoseRouter } from "./routers/diagnose";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    example: exampleRouter,
    symptom: symptomRouter,
    user: userRouter,
    case: caseRouter,
    diagnose: diagnoseRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
