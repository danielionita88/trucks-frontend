import React from 'react'
import {connect} from 'react-redux'
import {signup} from '../actions/index'


class Signup extends React.Component{


    state={
        username: '',
        password: '',
        password_confirmation: '',
        email: ''
    }

    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit=e=>{
        e.preventDefault()
        this.props.signup(this.state) 
    }

    render(){
        return <div >
            <form onSubmit={this.handleSubmit}>
                <span>Username</span>
                <input onChange={this.handleChange}type='text' name='username' value={this.state.username}/>
                <br/>
                <span>Password</span>
                <input onChange={this.handleChange} type='password' name='password' value={this.state.password}/>
                <br/>
                <span>Confirm Password</span>
                <input onChange={this.handleChange} type='password' name='password_confirmation' value={this.state.password_confirmation}/>
                <br/>
                <span> Email</span>
                <input onChange={this.handleChange} type='text' name='email' value={this.state.email}/>
                <br/>
                <input type='submit'/>
            </form>

        </div>
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        signup: (body)=>dispatch(signup(body))
    }
}

export default connect(null, mapDispatchToProps)(Signup)