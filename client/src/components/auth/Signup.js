import React, { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'
import { useUser } from '../contexts/UserContext'

export default function Signup() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const userNameRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const history = useHistory()

  const { setLocalUser } = useUser()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    }

    setIsLoading(true)
    Axios({
      method: 'POST',
      data: {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      },
      withCredentials: true,
      url: 'http://localhost:5000/register',
    })
      .then((res) => {
        setLocalUser(res.data)
        setError('')
        setIsLoading(false)
        console.log(res)
        history.push('/')
      })
      .catch((e) => {
        console.warn(e)
        setError('Failed to create account')
        setIsLoading(false)
      })
  }

  return (
    <div className=''>
      <div className='signup-container card'>
        <span>Sign Up</span>
        {error && <div className='error'>{error}</div>}
        <div className='input'>
          <form onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' required ref={userNameRef} />
            <label>Password</label>
            <input type='password' required ref={passwordRef} />
            <label>Confirm Password</label>
            <input type='password' required ref={confirmPasswordRef} />
            <button disabled={isLoading} type='submit' className='btn sign-up'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className='redirect-login'>
        Already have an account? <Link to='/login'>Log In</Link>
      </div>
    </div>
  )
}
