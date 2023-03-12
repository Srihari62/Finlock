import React,{useState,createContext} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom';

import Login from './components/Login'
import Register from './components/Register'
import Myprofile from './components/Myprofile'
export const store = createContext();

const App = () => {
  const [token,setToken] = useState(null);
  return (
    <div>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/myprofile' component={Myprofile} /> 
           <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App
