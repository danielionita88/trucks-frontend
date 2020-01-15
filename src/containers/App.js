import React from 'react';
import '../App.css'
import {Route} from 'react-router-dom'
import {Router} from 'react-router-dom'
import Signup from '../components/Signup'
import Login from '../components/Login'
import history from '../history'
import CreatePost from '../components/CreatePost'
import HomePage from '../components/HomePage'
import PostList from '../components/PostList'
import UsersProfile from './UsersProfile'
import {connect} from 'react-redux'
import {getAllPosts, getKey,checkUser} from '../actions/index'
import ShowPost from '../components/ShowPost'

class App extends React.Component {

  componentDidMount(){
    this.props.getAllPosts()
    this.props.getKey()
    const token = localStorage.getItem('token')
    if (token){
      this.props.checkUser(token)
    }
    
  }
  
  render(){
    return (
      <Router history={history}>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/new-post' component={CreatePost}/>
        <Route exact path='/' component={HomePage}/>
        <Route exact path='/used-trucks' component={PostList}/>
        <Route exact path='/used-trucks/:postId' component={ShowPost}/>
        <Route exact path='/profile' component={UsersProfile}/>
      </Router>
    );
  }
}


const mapDispatchToProps=dispatch=>{
  return{
    getAllPosts: ()=>dispatch(getAllPosts()),
    getKey: ()=>dispatch(getKey()),
    checkUser: token=>dispatch(checkUser(token))
  }
}

export default connect(null, mapDispatchToProps)(App);
