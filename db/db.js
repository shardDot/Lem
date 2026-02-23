import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import { __dirname } from '../server.js'

export async function getDBConnection() {
  const dbPath = path.join(__dirname, 'db', 'database.db')
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  })
}
