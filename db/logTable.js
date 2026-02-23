import { table } from 'node:console'
import { getDBConnection } from './db.js'

export async function logTable() {
  const db = getDBConnection()
  const tableName = 'users'
  const result = (await db).all(`SELECT * FROM ${tableName}`)
  console.table(result)
}

logTable()
