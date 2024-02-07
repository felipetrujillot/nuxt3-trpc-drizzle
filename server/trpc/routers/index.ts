import { router, publicProcedure } from "../trpc";
import type { inferRouterOutputs } from "@trpc/server";
//import { trpcWebpay } from './webpay'

/**
 *
 */
export const appRouter = router({
  //webpay: trpcWebpay,

  test: publicProcedure.query(() => {
    return "hello";
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterOutputs<AppRouter>;
