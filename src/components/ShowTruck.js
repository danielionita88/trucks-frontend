import React from 'react'
import {connect} from 'react-redux'
// import WithPost from './WithPost'
import {Grid} from 'semantic-ui-react'
import Navbar from './Navbar'
 
class ShowTruck extends React.Component{


    render(){console.log(this.props)
        const post=this.props.selectedPost
        
        return <div>
            <Navbar/>
            <Grid className='post-container'>
                <Grid.Column width={6}>
                <h2>{post.title}</h2>
                <img src={`http://localhost:3000/${post.photos_urls}`}/>
                </Grid.Column>

                <Grid.Column width={8}>  
                <p>Make: {post.make}</p>
                <p>Model: {post.model}</p>
                <p>Year: {post.model_year}</p>
                <p>Odometer: {post.odometer}</p>
                <p>Title status: {post.title_status}</p>
                <p>Price: {post.price}</p>
                <p>City: {post.city}</p>
                </Grid.Column>
            </Grid>
            <div id='description'>
                <p>Description: {post.description}</p>
            </div>
        </div>
    }
}

const mapStateToProps=state=>{
    return{
      selectedPost: state.posts.selectedPost
    }
  }

export default connect(mapStateToProps)(ShowTruck)