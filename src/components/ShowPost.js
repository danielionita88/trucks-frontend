import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image, Button} from 'semantic-ui-react'
import MapContainer from './MapContainer'
import {getPost, getKey, likePost} from '../actions/index'
import {FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon,WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon} from 'react-share'

 
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
                mainPhoto: this.props.selectedPost.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`${this.props.selectedPost.photos_urls[0]}`
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
                mainPhoto: this.props.selectedPost.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`${this.props.selectedPost.photos_urls[0]}`
            })
        }
    }

    handleMouseOver=index=>{
        this.setState({
            mainPhoto: `${this.props.selectedPost.photos_urls[index]}`
        })
    }

    handleLike=(userId,postId)=>{
        this.props.likePost(userId,postId)
    }

    renderPictures=urls=>{
        return urls.map((url,index) => 
            <Image onMouseOver={()=>this.handleMouseOver(index)} size='tiny' key={index}src={`${url}`}/>
        )
    } 

    render(){ 
        const post=this.props.selectedPost
        const shareUrl=`http://trucks.com/${this.props.location.pathname}`
        if(this.state.loading) {
            return <div>
                <h2>LOADING</h2>
            </div>
        }
        
        return <div>
            <br/>
            <Grid container >
                <Grid.Row>
                    <h2>{post.title}</h2>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <div id='main-photo'>
                            <Image size='big' centered src={this.state.mainPhoto} />
                        </div>
                        <Image.Group size='tiny'>
                            {this.renderPictures(post.photos_urls)}
                        </Image.Group>
                    </Grid.Column>
                    <Grid.Column width={5}>  
                        <Grid.Row>
                            <h3>Details:</h3>
                            <p>Make: {post.make}</p>
                            <p>Model: {post.model}</p>
                            <p>Year: {post.model_year}</p>
                            <p>Odometer: {post.odometer}</p>
                            <p>Title status: {post.title_status}</p>
                            <p>Price: {post.price}</p>
                            <p>Address: {post.address}</p>
                            {this.props.user && !this.props.likedPosts.find(p => p.id === post.id) && post.user_id !== this.props.user  ? <Button style={{padding: '10px'}}onClick={()=>this.handleLike(this.props.user, post)}>Like</Button> : ''}
                        </Grid.Row>
                        <Grid.Row>
                            <FacebookShareButton
                                url={shareUrl}
                                quote={post.title}
                            >
                                <FacebookIcon size={40}/>
                            </FacebookShareButton>
                            <TwitterShareButton
                                url={shareUrl}
                                quote={post.title}
                            >
                                <TwitterIcon size={40}/>
                            </TwitterShareButton>
                            <WhatsappShareButton
                                url={shareUrl}
                                quote={post.title}
                            >
                                <WhatsappIcon size={40}/>
                            </WhatsappShareButton>
                            <EmailShareButton
                                url={shareUrl}
                                quote={post.title}
                                >
                                <EmailIcon size={40}/>
                            </EmailShareButton>
                        </Grid.Row>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={13}>
                        <h3>Description:</h3>
                        <p>{post.description}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            
            {this.props.googleKey ? <div id='map-container'><MapContainer post={post} googleKey={this.props.googleKey}/></div> : null}
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
