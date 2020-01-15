import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Button} from 'semantic-ui-react'
import Navbar from './Navbar'
import MapContainer from './MapContainer'
import {getPost, getKey, likePost} from '../actions/index'


 
class ShowPost extends React.Component{
    constructor(props){
        super(props)
        if (this.props.selectedPost.photos_urls.length === 0){
            this.state = {
                loading: true,
                mainPhoto: ''
            }
        } else {
            this.state={
                mainPhoto: this.props.selectedPost.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`http://localhost:3000/${this.props.selectedPost.photos_urls[0]}`
            }
        }
    }

    
    componentDidMount(){
        if (this.state.loading){
            const id = parseInt(this.props.match.params.postId)
            this.props.getPost(id)
            this.props.getKey()
            this.setState({
                loading: false
            })
        }
        window.scrollTo(0, 0)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.setState({
                mainPhoto: this.props.selectedPost.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`http://localhost:3000/${this.props.selectedPost.photos_urls[0]}`
            })
        }
    }

    handleMouseOver=index=>{
        this.setState({
            mainPhoto: `http://localhost:3000/${this.props.selectedPost.photos_urls[index]}`
        })
    }

    handleLike=(userId,postId)=>{
        this.props.likePost(userId,postId)
    }

    renderPictures=urls=>{
        return urls.map((url,index) => 
            <Image onMouseOver={()=>this.handleMouseOver(index)} id='preview-pictures' key={index}src={`http://localhost:3000/${url}`}/>
        )
    } 

    render(){
        const post=this.props.selectedPost
        if(this.state.loading) {
            return <div>
                <h2>LOADING</h2>
            </div>
        }
        
        return <div>
            <Navbar/>
            {this.props.user && !this.props.likedPosts.find(p => p.id === post.id) ? <Button onClick={()=>this.handleLike(this.props.user, post)}>Like</Button> : ''}
            <Grid className='post-container'>
                <h2>{post.title}</h2>
                <Grid.Row>
                    <Grid.Column width={5}>
                        <div id='main-photo'>
                            <Image size='big'src={this.state.mainPhoto} />
                        </div>
                        <Image.Group size='tiny'>
                            {this.renderPictures(post.photos_urls)}
                        </Image.Group>
                    </Grid.Column>

                    <Grid.Column width={3}>  
                        <p>Make: {post.make}</p>
                        <p>Model: {post.model}</p>
                        <p>Year: {post.model_year}</p>
                        <p>Odometer: {post.odometer}</p>
                        <p>Title status: {post.title_status}</p>
                        <p>Price: {post.price}</p>
                        <p>Address: {post.address}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <p>Description:</p>
                        <p>{post.description}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            {this.props.googleKey ? <MapContainer post={post} googleKey={this.props.googleKey}/> : null}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
      selectedPost: state.posts.selectedPost,
      googleKey: state.googleKey,
      user: state.user.id,
      likedPosts: state.posts.likedPosts
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        getPost: id=>dispatch(getPost(id)),
        getKey: ()=>dispatch(getKey()),
        likePost: (userId,postId) => dispatch(likePost(userId,postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost)
