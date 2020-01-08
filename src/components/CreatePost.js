import React from 'react'
import WithAuth from './WithAuth'


class CreatePost extends React.Component{

   
    render(){
        return <div>
            <h1>Create post</h1>
        </div>
    }
}

export default WithAuth(CreatePost)