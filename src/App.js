import React from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import {Router} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import history from './history'
import CreatePost from './components/CreatePost'

class App extends React.Component {
  
  
  render(){
    return (
      <Router history={history}>
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        <Route path='/new-post' component={CreatePost}/>
      </Router>
    );
  }
}

export default App;
