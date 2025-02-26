import { Inngest } from "inngest";

// Create a client to send and receive events
// export const inngest = new Inngest({ id: "my-app" });         // This is original function bring from official website, inside this line, that is updated function...
export const inngest = new Inngest({ 
    id: "welth", 
    name: "Welth", 
    retryFunction: async (attempt) => ({
        delay: Math.pow(2, attempt) * 1000,     // Exponential backoff
        maxAttempts: 2,
    })
 });
