import { Route } from 'react-router-dom'

import './index.css'

import { Home } from './views/Home'
import { Login } from './views/Login'
import { SignUp } from './views/SignUp'

/**
 * NOTE: THis component contains routes presented to unauthenticated users and should be lazy loaded in app.tsx
 */

export default function UnauthenticatedApp() {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
    </div>
  )
}
