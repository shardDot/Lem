const form = document.querySelector('form')
const user = await checkAuth()

if (user.isLoggedIn) {
  window.location.href = '/'
}

form.addEventListener('submit', async e => {
  e.preventDefault()
  const formData = new FormData(form)
  const user = {
    name: formData.get('name'),
    email: formData.get('email'),
    username: formData.get('username'),
    password: formData.get('password'),
  }

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })

  if (res.ok) {
    window.location.href = '/login.html'
  }

  console.log(user)
})
