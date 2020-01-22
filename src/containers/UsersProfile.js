import React from 'react'
import UsersPostsList from '../components/UsersPostsList'
import UsersLikedPosts from '../components/UsersLikedPosts'
import WithAuth from '../components/WithAuth'
import Navbar from '../components/Navbar'
import {Grid} from 'semantic-ui-react'
import {connect} from 'react-redux'




class UsersProfile extends React.Component{

    render(){
        return <div>
            <Navbar/>
            <Grid className='users-profile'>
                <Grid.Row>
                    <Grid.Column>
                        <h2>Hello {this.props.user.username}</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <UsersPostsList/>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <UsersLikedPosts/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(WithAuth(UsersProfile))