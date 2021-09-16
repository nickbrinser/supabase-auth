import React from 'react'
import * as RD from '@devexperts/remote-data-ts'
import { Session, User } from '@supabase/gotrue-js'
import { pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

import { supabase } from './supabase'

// ---------- authentication actions -------------

export const signUp = (email: string, password: string) =>
  supabase.auth.signUp({ email, password })

export const login = (email: string, password: string) =>
  supabase.auth.signIn({ email, password })

export const signOut = () => supabase.auth.signOut()

// ----------- React authentication functionality --------

export type CurrentUser = RD.RemoteData<Error, O.Option<User>> // NOTE: this could potentially be O.Option<User>
export const AuthContext = React.createContext<CurrentUser>(RD.initial)

interface AuthProviderProps {
  children: React.ReactElement
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState<CurrentUser>(RD.pending)
  React.useEffect(() => {
    const user = getUserFromSession(supabase.auth.session())
    setCurrentUser(RD.success(user))

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) =>
      pipe(session, getUserFromSession, RD.success, setCurrentUser),
    )
    return () => {
      listener?.unsubscribe()
    }
  }, [])
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const getUserFromSession = (session: Session | null) =>
  pipe(
    session,
    O.fromNullable,
    O.chain(s => pipe(s.user, O.fromNullable)),
  )
