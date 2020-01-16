import React from 'react'
import {connect} from 'react-redux'
import {deletePost} from '../actions/index'
import {Grid, Image, Button} from 'semantic-ui-react'




class UsersPostsList extends React.Component{

    handleDelete=(id)=>{
        this.props.deletePost(id)
    }

    renderPosts=posts=>{
       return posts.map(post => <Grid key={post.id}>
            <Grid.Column width={2}>
                <Image size='tiny' src={post.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`${post.photos_urls[0]}`}/>             </Grid.Column>
             <Grid.Column width={5}>
                 {post.title}
             </Grid.Column>
             <Grid.Column width={2}>
                <Button onClick={()=>this.handleDelete(post.id)}size='tiny'>Delete</Button>
             </Grid.Column>
           </Grid>
        )
    }

    render(){
        const posts= this.props.posts.filter(post => post.user_id === this.props.user.id)
        return <div>
            <h1>Users Posts List</h1>
            {this.renderPosts(posts)}
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