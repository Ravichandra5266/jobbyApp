import {Route, Switch} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
  </Switch>
)

export default App
