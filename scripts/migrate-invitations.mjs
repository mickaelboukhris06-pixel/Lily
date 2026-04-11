import { createClient } from '@libsql/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, '../.env'), 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => {
      const [k, ...rest] = l.split('=')
      return [k.trim(), rest.join('=').trim().replace(/^"(.*)"$/, '$1')]
    })
)

const db = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
})

const steps = [
  `ALTER TABLE "User" ADD COLUMN "role" TEXT NOT NULL DEFAULT 'member'`,
  `ALTER TABLE "User" ADD COLUMN "plan" TEXT NOT NULL DEFAULT 'free'`,
  `ALTER TABLE "User" ADD COLUMN "stripeCustomerId" TEXT`,
  `CREATE TABLE IF NOT EXISTS "Invitation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "token" TEXT NOT NULL,
    "email" TEXT,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "stripeSessionId" TEXT,
    "createdById" TEXT NOT NULL,
    "usedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" DATETIME,
    CONSTRAINT "Invitation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE CASCADE,
    CONSTRAINT "Invitation_usedById_fkey" FOREIGN KEY ("usedById") REFERENCES "User" ("id") ON DELETE SET NULL
  )`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Invitation_token_key" ON "Invitation"("token")`,
  `CREATE UNIQUE INDEX IF NOT EXISTS "Invitation_usedById_key" ON "Invitation"("usedById")`,
]

for (const sql of steps) {
  try {
    await db.execute(sql)
    console.log('✓', sql.slice(0, 60))
  } catch (e) {
    if (e.message?.includes('duplicate column') || e.message?.includes('already exists')) {
      console.log('– already exists, skipping')
    } else {
      console.error('✗', e.message)
      process.exit(1)
    }
  }
}

console.log('\nMigration complete.')
