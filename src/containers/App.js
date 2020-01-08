import React from 'react';
import {Route} from 'react-router-dom'
import {Router} from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import history from '../history'
import CreatePost from '../components/CreatePost'
import HomePage from '../components/HomePage'
import '../App.css'

class App extends React.Component {
  
  
  render(){
    return (
      <Router history={history}>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/new-post' component={CreatePost}/>
        <Route exact path='/home' component={HomePage}/>
      </Router>
    );
  }
}

export default App;
