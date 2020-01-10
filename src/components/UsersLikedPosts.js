import React from 'react'
import {connect} from 'react-redux'


class UsersLikedPosts extends React.Component{

    render(){
        return <div>
            <h1>Users Liked Posts</h1>
            {this.props.likedPosts.map(post => <li key={post.id}>{post.title}</li>)}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        likedPosts: state.posts.likedPosts
    }
}

export default connect(mapStateToProps)(UsersLikedPosts)