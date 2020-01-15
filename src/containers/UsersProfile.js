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
            <Grid>
            <h2>Hello {this.props.user.username}</h2>
            <Grid.Column width={5}>
                <UsersPostsList/>
            </Grid.Column>
            <Grid.Column width={5}>
                <UsersLikedPosts/>
            </Grid.Column>
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