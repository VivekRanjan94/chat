// import React from 'react'
// import Signup from './auth/Signup'
// import { UserProvider } from './contexts/UserContext'

// export default function App() {
//   return (
//     <UserProvider>
//       <Signup />
//     </UserProvider>
//   )
// }

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
// import Login from './auth/Login'
import Signup from './auth/Signup'
import Login from './auth/Login'
import Main from './main/Main'
import { UserProvider } from './contexts/UserContext'

export default function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Switch>
            <PrivateRoute exact path='/' component={Main} />
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
          </Switch>
        </UserProvider>
      </Router>
    </>
  )
}
