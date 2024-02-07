import type { AppRouter } from "~/server/trpc/routers";

export default defineNuxtPlugin(async () => {
  const { httpBatchLink } = await import("trpc-nuxt/client");
  const { createTRPCProxyClient } = await import("@trpc/client");
  /**
   * createTRPCNuxtClient adds a `useQuery` composable
   * built on top of `useAsyncData`.
   */

  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return {
    provide: {
      client,
    },
  };
});
