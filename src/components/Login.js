import React from 'react'
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'



class Login extends React.Component{

    state={
        username: '',
        password: ''
    }

    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin= e=>{
        e.preventDefault()
      
    }

    
    render(){
        return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
             <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='blue' textAlign='center'>
                    <Image src='https://logopond.com/logos/e60a215d0cd51962610549d3ae45bb34.png' /> Log-in to your account
                </Header>
            <Form onSubmit={this.handleLogin}>
                <Segment stacked>
                    <Form.Input fluid icon='user' 
                        iconPosition='left'
                        name={'username'} 
                        onChange={this.handleChange} 
                        value={this.state.username} 
                        placeholder='username'
                    />
                    <Form.Input fluid icon='lock'
                        iconPosition='left'
                        name={'password'}
                        type='password  '
                        onChange={this.handleChange} 
                        value={this.state.password} 
                        placeholder='password'
                    />
                    <Button color='blue' fluid size='large'>Login</Button>
                </Segment>
            </Form>
            </Grid.Column>
        </Grid>
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        
    }
}

export default connect(null, mapDispatchToProps)(Login)