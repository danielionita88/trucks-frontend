import React from 'react'
import UsersPostsList from '../components/UsersPostsList'
import UsersLikedPosts from '../components/UsersLikedPosts'
import WithAuth from '../components/WithAuth'




class UsersProfile extends React.Component{
    render(){
        return <div>
            <h2>Hello User</h2>
            <UsersPostsList/>
            <UsersLikedPosts/>
        </div>
    }
}


export default WithAuth(UsersProfile)