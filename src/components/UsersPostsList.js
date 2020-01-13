import React from 'react'
import {connect} from 'react-redux'
import {deletePost} from '../actions/index'



class UsersPostsList extends React.Component{

    handleDelete=(id)=>{
        this.props.deletePost(id)
    }

    render(){
        const posts= this.props.posts.filter(post => post.user_id === this.props.user.id)
        return <div>
            <h1>Users Posts List</h1>
            {posts.map(post => <li key={post.id}>{post.title}<button onClick={()=>this.handleDelete(post.id)}>Delete</button></li>)}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        user:state.user,
        posts: state.posts.allPosts
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        deletePost: id => dispatch(deletePost(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPostsList)