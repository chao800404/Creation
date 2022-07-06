import React from 'react'
import useStore from '../store/store'
import shallow from 'zustand/shallow'

const Login = () => {
  const user = useStore((state) => state.user, shallow)
  const addUser = useStore((state) => state.addUser)
  const togglePopup = useStore((state) => state.togglePopup)
  const toggle = useStore((state) => state.toggle)

  return (
    <>
      {togglePopup && (
        <>
          <h1>{user.name} around here ...</h1>
          <p>{user.email}</p>
          <p>{user.photoUrl}</p>
          <button
            onClick={() =>
              addUser({
                name: 'chao',
                photoUrl: 'djewijf',
                email: 'a0921342997',
              })
            }
          >
            one up
          </button>
          <button
            onClick={() => addUser({ name: '', photoUrl: '', email: '' })}
          >
            logout
          </button>
        </>
      )}

      <button onClick={() => toggle()}>toggle</button>
    </>
  )
}

export default Login
