const form = document.querySelector('form')

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
