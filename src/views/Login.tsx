import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { pipe } from 'fp-ts/lib/function'
import * as T from 'fp-ts/Task'
import * as TO from 'fp-ts/TaskOption'

import { login } from '../Auth'

export function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const history = useHistory()

  const handleLogin = pipe(
    TO.tryCatch(() => login(email, password)),
    TO.chain(({ error }) => pipe(error, TO.fromNullable)), // NOTE: supbase catches errors in their API client, so we need to extract any errors from the response
    TO.fold(
      () => T.of(history.push('/')),
      err => T.fromIO(() => alert(err.message)),
    ),
  )

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Login </h1>

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
              handleLogin()
            }}
            className={'button block'}
          >
            Login
          </button>
        </div>
        <div
          className="row flex flex-center items-center "
          style={{ gap: '8px' }}
        >
          <p>Need to make an account?</p>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}
