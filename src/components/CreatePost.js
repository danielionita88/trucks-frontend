import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'


class CreatePost extends React.Component{

   
    render(){
        return <div>
            <Navbar/>
            <h1>Create post</h1>
        </div>
    }
}

export default WithAuth(CreatePost)