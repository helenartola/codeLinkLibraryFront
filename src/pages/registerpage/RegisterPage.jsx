import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../../components/UserContext'
//import { useUserActions } from '../../hooks/api'
import './RegisterPage.css' 

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //const userActions = useUserActions()
  const [user, setUser] = useUser()

  const handleSubmit = e => {
    e.preventDefault()
    userActions.register(name, email, password) 
      .then(data => {
        setUser(data.data)
      })
  }

  if (user) return <Navigate to="/" />

  return (
    <form id="register" onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        type="text"
        required
        placeholder="Nombre..."
      />
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        required
        placeholder="Email..."
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        required
        placeholder="Contraseña..."
      />
      <button>Registrarse</button>
    </form>
  )
}

export default RegisterPage
