import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginRegister from './pages/LoginRegister'
import { AuthProvider } from './context/auth'
import SavedPage from './pages/SavedPage'
import './Css/App.css'
import Home from './pages/Home'
import UserRoute from './routes/UserRoute'
import SinglePost from './pages/SinglePost'
import ProfilePage from './pages/ProfilePage'
import Sidebar from './shared/sidebar/Sidebar'


function App() {
                            

  return (
    <AuthProvider>
    <div className="TotalContainer">

            <Router>
  
                  <Switch>
                    
                    <Route exact path='/'>
                      <LoginRegister/>
                    </Route>
                    <Route>
                      <Sidebar/>
                      <UserRoute exact path='/home' component={Home}/>
                      <UserRoute exact path='/posts/:postId' component={SinglePost}/>
                      <UserRoute exact path='/profile/:username' component={ProfilePage}/>
                      <UserRoute exact path='/saved' component={SavedPage}/>
                    </Route>
                    
                  </Switch>
              </Router>
        </div>
        </AuthProvider>
  )
}

export default App;
