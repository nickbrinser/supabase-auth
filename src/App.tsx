import { lazy, Suspense } from 'react'
import * as RD from '@devexperts/remote-data-ts'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

import './index.css'

import { useAuth } from './Auth'

const AuthenticatedApp = lazy(() => import('./authenticatedApp'))
const UnauthenticatedApp = lazy(() => import('./unauthenticatedApp'))

export function App() {
  const currentUser = useAuth()
  console.log(currentUser)
  return (
    <Suspense fallback={<div />}>
      {pipe(
        currentUser,
        RD.fold(
          () => null,
          () => <p>Loading</p>,
          () => <p>There is an error with authentication.</p>,
          user =>
            pipe(
              user,
              O.fold(
                () => <UnauthenticatedApp />,
                () => <AuthenticatedApp />,
              ),
            ),
        ),
      )}
    </Suspense>
  )
}
