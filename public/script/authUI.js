export async function checkAuth() {
  const res = await fetch('/api/auth/me')
  const data = res.json()

  if (!res.ok) {
    return false
  }

  console.log(data)
  return data
}
