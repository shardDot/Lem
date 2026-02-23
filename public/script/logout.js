export async function logout() {
  const res = await fetch('/api/auth/logout', {
    method: 'POST',
  })
  window.location.href = '/login.html'
}
