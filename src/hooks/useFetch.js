import useFetchSuspense from 'fetch-suspense'
import { useUser } from "../components/UserContext"

export const useFetch = (url) => {
  const [user] = useUser()
  const headers = {}
  if (user?.token) headers.Authorization = user.token
  return useFetchSuspense(url, { headers })
}

export const useFetchPost = () => {
  const [user] = useUser()
  return async (url, body, method) => {
    const headers = {}
    if (body && !(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }
    if (user?.token) headers.Authorization = user.token
    const res = await fetch(url, {
      method: method || 'POST',
      headers,
      body: body && (body instanceof FormData ? body : JSON.stringify(body))
    })
    if (res.ok) return await res.json()
    throw new Error(res.status)
  }
}

export default useFetch
