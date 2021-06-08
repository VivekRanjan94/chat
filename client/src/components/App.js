import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Main from './main/Main'
import { UserProvider } from './contexts/UserContext'
import Chat from './main/Chat'

export default function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Main} />
            <PrivateRoute path='/chat' component={Chat} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </UserProvider>
      </Router>
    </>
  )
}
