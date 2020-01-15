import React from 'react'
import {connect} from 'react-redux'
import {removeLike} from '../actions/index'


class UsersLikedPosts extends React.Component{


    handleClick=(userId, postId)=>{
        this.props.removeLike(userId,postId)
    }

    render(){
        return <div>
            <h1>Users Liked Posts</h1>
            {this.props.likedPosts.map(post => <li key={post.id}>{post.title} <button onClick={()=>this.handleClick(this.props.user.id, post.id)}>X</button></li>)}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        likedPosts: state.posts.likedPosts,
        user: state.user
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        removeLike: (userId,postId)=> dispatch(removeLike(userId,postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersLikedPosts)