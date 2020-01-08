import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import history from './history'

class App extends React.Component {
  
  
  render(){
    return (
      <Router history={history}>
        <div className="App">
          <Route path='/signup' component={Signup}/>
          <Route path='/login' component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
