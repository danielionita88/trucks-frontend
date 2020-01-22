import React from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {login, signup} from '../actions/index'
import Navbar from './Navbar'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';



class Login extends React.Component{

    state={
        username: 'daniel',
        password: '1234'
    }

    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin= e=>{
        e.preventDefault()
        this.props.login(this.state)
    }

    responseFacebook = (response) => {
        const body={
            username: response.name.split(' ')[0]+response.id.slice(0,4) ,
            password: response.id,
            password_confirmation: response.id,
            email: response.email
        }
        this.props.signup(body)
    }

    render(){
        return <div>
            <Navbar/>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='blue' textAlign='center'>
                        <Image src='https://cdn.clipart.email/0fbfcca826625419e9c317993ee2b2b1_semi-truck-truck-18-wheeler-16-wheeler-22-wheeler-big-truck-_570-466.jpeg' /> Log-in to your account
                    </Header>
                    <Form onSubmit={this.handleLogin}>
                        <Segment stacked>
                            <Form.Input fluid icon='user' 
                                iconPosition='left'
                                name={'username'} 
                                onChange={this.handleChange} 
                                value={this.state.username} 
                                placeholder='Username'
                            />
                            <Form.Input fluid icon='lock'
                                iconPosition='left'
                                name={'password'}
                                type='password'
                                onChange={this.handleChange} 
                                value={this.state.password} 
                                placeholder='Password'
                            />
                            <Button color='blue' fluid size='small'>Login</Button>
                            <h4>OR</h4>
                            <FacebookLogin
                                appId="261337928177060"
                                autoLoad={false}
                                fields="name,email,picture"
                                callback={this.responseFacebook} 
                                render={renderProps => (
                                    <Button color='blue' fluid size='large' onClick={renderProps.onClick}>Login with Facebook Account</Button>
                                  )}
                            />
                        </Segment>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        login: body=>dispatch(login(body)),
        signup: body=>dispatch(signup(body))
    }
}

export default connect(null, mapDispatchToProps)(Login)