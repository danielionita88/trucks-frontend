import React from 'react'
import {connect} from 'react-redux'
import {deletePost, setPost} from '../actions/index'
import {Grid, Image, Button, Segment} from 'semantic-ui-react'
import history from '../history'

class UsersPostsList extends React.Component{

    handleDelete=(id)=>{
        this.props.deletePost(id)
    }

    handlePostClick=post=>{
        this.props.setPost(post)
        history.push(`/used-trucks/${post.id}`)
    }

    renderPosts=posts=>{
       return posts.map(post => <Segment className='profile-list'key={post.id}>
            <Grid >
                <Grid.Row column='3' >
                    <Grid.Column onClick={()=>this.handlePostClick(post)}floated='left' width={2}>
                        <Image size='tiny' src={post.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`${post.photos_urls[0]}`}/>             
                    </Grid.Column>
                    <Grid.Column onClick={()=>this.handlePostClick(post)} width={5}>
                        <h4>{post.title}</h4>
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                        <Button onClick={()=>this.handleDelete(post.id)}size='tiny'>Delete</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
           </Segment>
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
        deletePost: id => dispatch(deletePost(id)),
        setPost: post=>dispatch(setPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPostsList)