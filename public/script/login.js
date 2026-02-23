import { checkAuth } from './authUI.js'

const form = document.querySelector('form')
const user = await checkAuth()

if (user.isLoggedIn) {
  window.location.href = '/'
}

form.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = new FormData(form)
  const user = {
    username: formData.get('username'),
    password: formData.get('password'),
  }

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const data = await res.json()
  if (!res.ok) {
    document.querySelector('#status').textContent = data.error
  }

  if (res.ok) {
    window.location.href = '/'
  }
})
