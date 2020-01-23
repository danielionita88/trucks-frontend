import React from 'react'
import {connect} from 'react-redux'
import {signup} from '../actions/index'
import { Button, Form } from 'semantic-ui-react'
import Navbar from './Navbar'


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
            <Navbar/>
            <div className='signup'>
                <h2>Create User</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Username</label>
                        <Form.Input 
                            onChange={this.handleChange}
                            type='text' 
                            iconPosition='left' 
                            icon='user'
                            name='username'
                            value={this.state.username}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input 
                            icon='lock'
                            iconPosition='left'
                            onChange={this.handleChange} 
                            type='password' 
                            name='password' 
                            value={this.state.password}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Confirm Password</label>
                        <Form.Input 
                            icon='lock'
                            iconPosition='left'
                            onChange={this.handleChange}
                            type='password' 
                            name='password_confirmation' 
                            value={this.state.password_confirmation}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label> Email</label>
                        <Form.Input 
                            icon='mail'
                            iconPosition='left'
                            onChange={this.handleChange} 
                            type='text' 
                            name='email' 
                            value={this.state.email}/>
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
            <div id='sign-up-img'>
                <img src={'https://bfmultimedia.com/wp-content/uploads/2016/10/peterbilt-01-1024x617.jpg'} alt="truck"/>
            </div>
        </div>
    }
}

const mapDispatchToProps = dispatch=>{
    return{
        signup: (body)=>dispatch(signup(body))
    }
}

export default connect(null, mapDispatchToProps)(Signup)