import React from 'react'


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
        // const reqObj={
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify(this.state)
        // }
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


export default Signup