import React from 'react'
import {connect} from 'react-redux'
// import WithPost from './WithPost'
import {Grid} from 'semantic-ui-react'
import Navbar from './Navbar'
import MapContainer from './MapContainer'

 
class ShowTruck extends React.Component{

    render(){console.log(this.props)
        const post=this.props.selectedPost
        
        return <div>
            <Navbar/>
            <Grid className='post-container'>
                <h2>{post.title}</h2>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <img src={`http://localhost:3000/${post.photos_urls}`}/>
                    </Grid.Column>

                    <Grid.Column width={3}>  
                        <p>Make: {post.make}</p>
                        <p>Model: {post.model}</p>
                        <p>Year: {post.model_year}</p>
                        <p>Odometer: {post.odometer}</p>
                        <p>Title status: {post.title_status}</p>
                        <p>Price: {post.price}</p>
                        <p>City: {post.city}</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <p>Description:</p>
                        <p>{post.description}</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <MapContainer/> 
        </div>
    }
}

const mapStateToProps=state=>{
    return{
      selectedPost: state.posts.selectedPost
    }
  }

export default connect(mapStateToProps)(ShowTruck)
