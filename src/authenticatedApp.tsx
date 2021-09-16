import { Route } from 'react-router-dom'

import './index.css'

import { Home } from './views/Home'

/**
 * NOTE: This component contains authenticated routes and should be lazy loaded as a user is defined into app.tsx
 */

export default function AuthenticatedApp() {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
    </div>
  )
}
