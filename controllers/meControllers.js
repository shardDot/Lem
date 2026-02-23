import { getDBConnection } from '../db/db.js'

export async function getCurrentUser(req, res) {
  try {
    const db = await getDBConnection()
    if (!req.session.userId) {
      return res.status(400).json({ isLoggedIn: false })
    }
    const user = await db.get(`SELECT name FROM users WHERE id = ?`, [
      req.session.userId,
    ])

    res.json({
      isLoggedIn: true,
      name: user.name,
    })
  } catch (error) {
    console.log('INTERNAL SERVER ERROR')
    res.status(500).json({
      error: error.message,
    })
  }
}
