import { Link } from 'react-router-dom'
import * as RD from '@devexperts/remote-data-ts'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

import { signOut, useAuth } from '../Auth'

export function Home() {
  const currentUser = useAuth()
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
                      <button className={'button block'}>
                        <Link to="/signup">Sign Up!</Link>
                      </button>
                    ),
                    () => (
                      <button
                        onClick={e => {
                          e.preventDefault()
                          signOut()
                        }}
                        className={'button block'}
                      >
                        Sign Out
                      </button>
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
