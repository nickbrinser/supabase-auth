import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import axios from 'axios'
// import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/TaskEither'

import { login } from '../Auth'

export function Login() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const history = useHistory()
  // console.log(history)

  const handleLogin = pipe(
    TE.tryCatch(
      () => login(email, password),
      reason => new Error(`${reason}`), // NOTE: with the Supabase Api, this case will never since the error is mapped to response param and not rejected.
    ),
    TE.foldW(
      _err => T.fromIO(() => alert(_err)),
      ({ error }) =>
        pipe(
          error,
          O.fromNullable,
          // NOTE: There must be a way to use TE.chain to map this error to another TaskEither and just use a single fold.
          O.fold(
            () => T.of(history.push('/')),
            err => T.fromIO(() => alert(err)),
          ),
        ),
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
