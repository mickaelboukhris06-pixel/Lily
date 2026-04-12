import { createClient } from '@libsql/client'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

await client.execute(`
  CREATE TABLE IF NOT EXISTS "CustomCard" (
    "id"         TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "title"      TEXT NOT NULL,
    "emoji"      TEXT,
    "enabled"    INTEGER NOT NULL DEFAULT 1,
    "order"      INTEGER NOT NULL DEFAULT 0,
    "createdAt"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE
  )
`)

await client.execute(`
  CREATE TABLE IF NOT EXISTS "CustomCardItem" (
    "id"           TEXT NOT NULL PRIMARY KEY,
    "customCardId" TEXT NOT NULL,
    "title"        TEXT NOT NULL,
    "content"      TEXT,
    "order"        INTEGER NOT NULL DEFAULT 0,
    "createdAt"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("customCardId") REFERENCES "CustomCard"("id") ON DELETE CASCADE
  )
`)

console.log('Migration custom cards: OK')
process.exit(0)
