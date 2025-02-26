import arcjet, { tokenBucket } from "@arcjet/next"

const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["userId"],      // Track based on Clerk userId
    rules: [
        tokenBucket({        // It is used for rate limiting...
            // Rate limiting specifically for collection creation
            mode: "LIVE",
            refillRate: 20,    // 20 collections
            interval: 3600,
            capacity: 20,          // every hour user can make 20 request and then it will refill by 20...
        }),
    ]
})

export default aj;