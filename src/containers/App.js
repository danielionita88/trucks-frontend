import React from 'react';
import '../App.css'
import {Route} from 'react-router-dom'
import {Router} from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import history from '../history'
import CreatePost from '../components/CreatePost'
import HomePage from '../components/HomePage'
import TruckList from '../components/TruckList'
import UsersProfile from './UsersProfile'

class App extends React.Component {
  
  
  render(){
    return (
      <Router history={history}>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/new-post' component={CreatePost}/>
        <Route exact path='/home' component={HomePage}/>
        <Route exact path='/used-trucks' component={TruckList}/>
        <Route exact path='/profile' component={UsersProfile}/>
      </Router>
    );
  }
}

export default App;
