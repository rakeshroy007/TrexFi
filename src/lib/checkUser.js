import { currentUser } from "@clerk/nextjs/server"
import { db } from "./prisma" 

export const checkUser = async () => { 
    const user = await currentUser() 
    
    if (!user) {
        console.log("Inside checkUser.js")
        return null 
        
    }

    // Check in Supabase... 
    try {
        const loggedInUser = await db.user.findUnique({
            where: {
                clerkUserId: user.id,
            }
        })

        if (loggedInUser) { 
            return loggedInUser
        } 

        const name = `${user.firstName} ${user.lastName}` ;
        const newUser = await db.user.create({ 
            data: { 
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0]?.emailAddress,
            }
        })

        return newUser ;
    } catch (error) {
        console.error("Database Error:", error.message)
        return null  // ✅ Added this to prevent continuation after an error
    }
}