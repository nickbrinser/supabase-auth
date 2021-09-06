import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './index.css'

import { Home } from './views/Home'
import { Login } from './views/Login'
import { SignUp } from './views/SignUp'

export function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  )
}
