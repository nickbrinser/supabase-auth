import { Link, useHistory } from 'react-router-dom'
import * as RD from '@devexperts/remote-data-ts'
import * as E from 'fp-ts/Either'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'
import * as TE from 'fp-ts/TaskEither'

import { signOut, useAuth } from '../Auth'

export function Home() {
  const currentUser = useAuth()

  const history = useHistory()

  const handleSignOut = pipe(
    TE.tryCatch(() => signOut(), E.toError),
    TE.map(() => history.push('/')),
  )

  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Supabase + React</h1>
        <div>
          {pipe(
            currentUser,
            RD.fold(
              () => null,
              () => null,
              () => null,
              u =>
                pipe(
                  u,
                  O.fold(
                    () => (
                      <div>
                        <Link to="/login">Login</Link> or{' '}
                        <Link to="/signup">Sign Up</Link>
                      </div>
                    ),
                    user => (
                      <div>
                        <p>Welcome, {user.id}!</p>
                        <button
                          onClick={e => {
                            e.preventDefault()
                            handleSignOut()
                          }}
                          className={'button block'}
                        >
                          Sign Out
                        </button>
                      </div>
                    ),
                  ),
                ),
            ),
          )}
        </div>
      </div>
    </div>
  )
}
