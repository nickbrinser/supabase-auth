import { useState } from 'react'
import { Link } from 'react-router-dom'

import { signUp } from '../Auth'

export function SignUp() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>

        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            className="inputField"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={e => {
              e.preventDefault()
              signUp(email, password)
            }}
            className={'button block'}
          >
            Sign Up
          </button>
        </div>
        <div
          className="row flex flex-center items-center"
          style={{ gap: '8px' }}
        >
          <p>Already have an account? </p>
          <Link to="/login">Log In</Link>
        </div>
      </div>
    </div>
  )
}
