import { appRouter } from "@/server"
import { httpBatchLink } from "@trpc/client"

export const serverClient = appRouter.createCaller({
  // @ts-ignore
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
})
