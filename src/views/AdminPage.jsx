import React, { useContext } from 'react'
import { UsuarioContext } from '../context/UsuarioContext'

const AdminPage = () => {
      const { usuario } = useContext(UsuarioContext)
    
  return (
    <main>
        <h1>Bienvenid@ {usuario.displayName}</h1>
    </main>
  )
}

export default AdminPage