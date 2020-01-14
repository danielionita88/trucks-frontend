import React from 'react'
import {connect} from 'react-redux'
import {Grid, Image} from 'semantic-ui-react'
import Navbar from './Navbar'
import MapContainer from './MapContainer'

 
class ShowPost extends React.Component{
    
    state={
        mainPhoto: `http://localhost:3000/${this.props.selectedPost.photos_urls[0]}`
    }

    handleClick=index=>{
        this.setState({
            mainPhoto: `http://localhost:3000/${this.props.selectedPost.photos_urls[index]}`
        })
    }

    renderPictures=urls=>{
        return urls.map((url,index) => 
            <Image onClick={()=>this.handleClick(index)} id='preview-pictures' key={index}src={`http://localhost:3000/${url}`}/>
        )
    } 
    componentDidMount() {
        window.scrollTo(0, 0)
      }
      

    render(){
        const post=this.props.selectedPost
        
        return <div>
            <Navbar/>
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
            <MapContainer post={post}/> 
        </div>
    }
}

const mapStateToProps=state=>{
    return{
      selectedPost: state.posts.selectedPost
    }
}

export default connect(mapStateToProps)(ShowPost)
