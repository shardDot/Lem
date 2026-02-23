import { checkAuth } from './script/authUI.js'
import { logout } from './script/logout.js'
const mainText = document.querySelector('#main-text')
const logReg = document.querySelector('#log-reg')

const user = await checkAuth()

if (user) {
  mainText.textContent = `Hello, ${user.name}`
  console.log(user)

  logReg.innerHTML = `
    <a id="logout-btn">Logout</a>
  `

  document.querySelector('#logout-btn').addEventListener('click', logout)
}
