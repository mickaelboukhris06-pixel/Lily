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

const db = createClient({ url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN })

const result = await db.execute({
  sql: `UPDATE "User" SET "role" = 'master', "plan" = 'free' WHERE "email" = ?`,
  args: ['mickael.boukhris06@gmail.com'],
})

console.log(`Updated ${result.rowsAffected} row(s).`)
