import React from 'react'
import {connect} from 'react-redux'
import {removeLike, setPost} from '../actions/index'
import {Grid, Image, Button, Segment} from 'semantic-ui-react'
import history from '../history'

class UsersLikedPosts extends React.Component{

    handleClick=(userId, postId)=>{
        this.props.removeLike(userId,postId)
    }

    handlePostClick=post=>{
        this.props.setPost(post)
        history.push(`/used-trucks/${post.id}`)
    }

    renderPosts=()=>{
        return this.props.likedPosts.map(post => <Segment key={post.id}>
            <Grid>
                <Grid.Row>
                    <Grid.Column onClick={()=>this.handlePostClick(post)}floated='left' width={2}>
                        <Image size='tiny' src={post.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`${post.photos_urls[0]}`}/>
                    </Grid.Column>
                    <Grid.Column onClick={()=>this.handlePostClick(post)}width={5}>
                        {post.title}
                    </Grid.Column>
                    <Grid.Column floated='right' width={3}>
                        <Button onClick={()=>this.handleClick(this.props.user.id,post.id)}size='tiny'>Unlike</Button>
                        <Button size='tiny'>Share</Button>
                    </Grid.Column>
                </Grid.Row>
           </Grid>
           </Segment>
        )
    }

    render(){
        return <div>
            <h1>Users Liked Posts</h1>
            {this.renderPosts()}
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
        removeLike: (userId,postId)=> dispatch(removeLike(userId,postId)),
        setPost: post=>dispatch(setPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersLikedPosts)