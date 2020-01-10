import React from 'react'
import {connect} from 'react-redux'
import {checkUser} from '../actions/index'


export default function WithAuth(Component){
    class Auth extends React.Component{

        componentDidMount(){
            const token = localStorage.getItem('token')
    
            if (!token){
                this.props.history.push('/login')
            }
            else{
                this.props.checkUser(token)
            }
        }  
        
        render(){
            return <Component {...this.props}/>
        }
    }
    
    const mapDispatchToProps=dispatch=>{
        return{
            checkUser: token=>dispatch(checkUser(token))
        }
    }
    
    return connect(null, mapDispatchToProps)(Auth)
}