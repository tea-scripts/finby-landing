import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

// Prisma 7 driver-adapter singleton. The PrismaPg adapter receives a pg
// PoolConfig ({ connectionString }) and the client talks to Postgres through it
// — there is no separate query engine binary at runtime.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
