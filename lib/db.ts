import { PrismaLibSql } from '@prisma/adapter-libsql'

// @ts-ignore — Prisma 7 generates to .prisma/client; TS server cache may lag after generate
import { PrismaClient } from '.prisma/client/index.js'

function createPrismaClient() {
  const url = process.env.TURSO_DATABASE_URL!
  const authToken = process.env.TURSO_AUTH_TOKEN
  const adapter = new PrismaLibSql({ url, authToken })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: InstanceType<typeof PrismaClient> }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
