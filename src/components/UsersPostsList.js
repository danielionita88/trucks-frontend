import React from 'react'
import {connect} from 'react-redux'


class UsersPostsList extends React.Component{

    render(){
        const posts= this.props.posts.filter(post => post.id === this.props.user.id)
        return <div>
            <h1>Users Posts List</h1>
            {posts.map(post => <li key={post.id}>{post.title}</li>)}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        user:state.user,
        posts: state.posts.allPosts
    }
}

export default connect(mapStateToProps)(UsersPostsList)