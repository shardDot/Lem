import express from 'express'
import session from 'express-session'
import { authRouter } from './routes/auth.js'
import dotenv from 'dotenv'
import { meRouter } from './routes/me.js'

dotenv.config()

export const __dirname = import.meta.dirname
const PORT = 8000
const app = express()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(express.json())
app.use(express.static('public'))
app.use('/', meRouter)
app.use('/api/auth', authRouter)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))
