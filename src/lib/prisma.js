import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient()       // 'globalThis' is a global object in JavaScript that persists across module reloads in Node.js.

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = db
}