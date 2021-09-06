import React from 'react'
import * as RD from '@devexperts/remote-data-ts'
import { User } from '@supabase/gotrue-js'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

import { supabase } from './supabaseClient'

// ---------- authentication actions -------------

export const signUp = (email: string, password: string) =>
  supabase.auth.signUp({ email, password })

export const signIn = (email: string, password: string) =>
  supabase.auth.signIn({ email, password })

export const signOut = () => supabase.auth.signOut()

// ----------- React authentication functionality --------

export type CurrentUser = RD.RemoteData<Error, User> // NOTE: this could potentially be O.Option<User>
export const AuthContext = React.createContext<CurrentUser>(RD.initial)

interface AuthProviderProps {
  children: React.ReactElement
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<CurrentUser>(RD.pending)

  React.useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) =>
      pipe(
        session,
        O.fromNullable,
        O.chain(s => pipe(s.user, O.fromNullable)),
        O.map(flow(RD.success, setUser)),
      ),
    )
  })
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
