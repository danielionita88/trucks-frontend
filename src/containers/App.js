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
import {connect} from 'react-redux'
import {getAllPosts} from '../actions/index'
import ShowTruck from '../components/ShowTruck'

class App extends React.Component {

  componentDidMount(){
    this.props.getAllPosts()
  }
  
  render(){
    return (
      <Router history={history}>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/new-post' component={CreatePost}/>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/used-trucks' component={TruckList}/>
        <Route exact path='/used-trucks/:postId' component={ShowTruck}/>
        <Route exact path='/profile' component={UsersProfile}/>
      </Router>
    );
  }
}


const mapDispatchToProps=dispatch=>{
  return{
    getAllPosts: ()=>dispatch(getAllPosts())
  }
}

export default connect(null, mapDispatchToProps)(App);
