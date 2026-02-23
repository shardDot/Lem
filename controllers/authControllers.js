import { getDBConnection } from '../db/db.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'

export async function registerUser(req, res) {
  let { name, email, username, password } = req.body
  console.log(req.body)

  if (!name || !email || !username || !password) {
    return res.status(400).json({
      error: `All fields are required`,
    })
  }

  name = name.trim()
  username = username.toLowerCase().trim()
  email = email.trim()
  password = password.trim()

  if (!/^[a-zA-Z0-9_-]{1,20}$/.test(username)) {
    return res.status(400).json({
      error: `Username must be 1–20 characters, using letters, numbers, _ or -.`,
    })
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: `Invalid email format`,
    })
  }

  try {
    password = await bcrypt.hash(password, 10)

    const db = await getDBConnection()

    const existing = await db.get(
      `SELECT id from users WHERE email = ? OR username = ?`,
      [email, username]
    )

    if (existing) {
      return res
        .status(400)
        .json({ error: `Email or username already in use.` })
    }

    await db.run(
      `
      INSERT INTO users (name, email, username, password)
      VALUES (?,?,?,?)
    `,
      [name, email, username, password]
    )

    return res.status(201).json({ message: `User registred` })
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Registration failed. Please try again.' })
  }
}

export async function loginUser(req, res) {
  const db = await getDBConnection()
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: `All fields are required` })
  }

  try {
    const user = await db.get(`SELECT * FROM users WHERE username = ?`, [
      username,
    ])
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(400).json({ error: `Invalid credentials` })
    }
    req.session.userId = user.id
    res.json({ message: `Logged in` })
  } catch (error) {
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
}
