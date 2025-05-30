import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/api/uploadthing",
    "/blog",
    "/about",
    "/testimonials",
    "/contact",
    "/policies",
  ],
  clockSkewInMs: 30000,
  afterAuth(auth, req, evt) {
    // This function is called after a user is authenticated
    // You can use this to update the user's session, or add a cookie
    // See https://clerk.com/docs/references/nextjs/auth-middleware#afterauth for more information
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
