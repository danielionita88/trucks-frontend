import React from 'react'
import UsersPostsList from '../components/UsersPostsList'
import UsersLikedPosts from '../components/UsersLikedPosts'
import WithAuth from '../components/WithAuth'
import Navbar from '../components/Navbar'
import {Grid} from 'semantic-ui-react'




class UsersProfile extends React.Component{

    render(){
        return <div>
            <Navbar/>
            <Grid>
            <h2>Hello User</h2>
            <Grid.Column floated='left' width={5}>
                <UsersPostsList/>
            </Grid.Column>
            <Grid.Column floated='right'width={5}>
                <UsersLikedPosts/>
            </Grid.Column>
            </Grid>
        </div>
    }
}

export default WithAuth(UsersProfile)