import { checkAuth } from './script/authUI.js'
const mainText = document.querySelector('#main-text')

const user = await checkAuth()

if (user) {
  mainText.textContent = `Hello, ${user.name}`
  console.log(user)
}
