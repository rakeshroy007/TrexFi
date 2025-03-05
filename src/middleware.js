import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)", 
]) 

// Enable Bot protection : here we track using IP Address... 
const aj = arcjet({ 
  key: process.env.ARCJET_KEY, 
  rules: [ 
    shield({ 
      mode: "LIVE"     // 2️⃣ Enabling real-time protection 
    }), 
    detectBot({         // Detects and blocks bots accessing your website.
      mode: "LIVE",     // 3️⃣ Detecting bots in real-time
      allow: [ "CATEGORY:SEARCH_ENGINE", "GO_HTTP", "LINKEDIN_CRAWLER" ]  // 📌 Allowing certain bots...  Allows search engine bots (e.g., Google, Bing)...  Allows bots using Go HTTP clients.
    }) 
  ] 
})  
 
// ➡️ This code is for the 'bot protection' concept 
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth(); 

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth()

    return redirectToSignIn()
  }
});
export default createMiddleware(aj, clerk)



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};