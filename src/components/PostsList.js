import React from 'react'
import Navbar from './Navbar'
import { Input, Grid, Image, Radio,Dimmer, Loader, Label,Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setPost} from '../actions/index'
import MapContainer from './MapContainer'


class PostsList extends React.Component{

    state={
        sortByPrice: false,
        searchTerm: '',
        mapView: false
    }

    handleSearch=e=>{
        this.setState({
            searchTerm: e.target.value
        })
    }

    handlePostClick=post=>{
        this.props.setPost(post)
        this.props.history.push(`/used-trucks/${post.id}`)
    }

    renderImages=(post)=>{
        return post.photos_urls.map(url => <img src={`${url}` } alt='truck'/>)
    }

    renderTrucks=(posts)=>{
       return posts.map(post=> <div onClick={()=>this.handlePostClick(post)} key={post.id}className='truck-card'>
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image src={post.photos_urls.length < 1 ? `https://vollrath.com/ClientCss/images/VollrathImages/No_Image_Available.jpg`:`${post.photos_urls[0]}` } />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <h3>{post.title}</h3>
                            <p>Model: {post.model}</p>
                            <p>Odometer: {post.odometer}</p>
                            <p>Price: ${post.price}</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
       )
    }

    handleSort= ()=>{
        this.setState({
            sortByPrice: !this.state.sortByPrice
        })
    }

    sortPosts=posts=>{
        let newArr = posts.slice()
       return newArr.sort((a,b)=> (a.price > b.price)? 1: -1)
    }

    handleMapView=()=>{
        this.setState({
            mapView: !this.state.mapView
        })
    }
 
    render(){
        let posts=this.props.posts.sort((a,b) => a.id < b.id ? 1: -1)
        let term =this.state.searchTerm.toLowerCase()
        let searchedPosts = this.state.searchTerm ? 
            posts.filter(post=> post.make.toLowerCase().includes(term)|| post.model.toLowerCase().includes(term) || post.title.toLowerCase().includes(term))
            :
            posts
        let sortedPosts = this.sortPosts(searchedPosts)

        if(this.props.posts.length === 0){
            return <div>
                <h1>Loading...</h1>
                <Dimmer active>
                    <Loader />
                </Dimmer>
                </div>
        }
        
        else return<div>
            <Navbar/>
            <div className='sub-menu'>
                <Input onChange={this.handleSearch}icon='search' placeholder='Search...' />
                {!this.state.mapView ? <Radio onClick={this.handleSort} label='Sort By Price' style={{margin:15}} checked={this.state.sortByPrice}/> : null}
                {this.state.mapView ? <Label as='a' onClick={this.handleMapView}><Icon name='list'/>View List</Label>: <Label as='a' onClick={this.handleMapView}><Icon name='map marker alternate'/>View on map</Label>}
                <br/>
            </div>
            {this.state.mapView ? <MapContainer googleKey={this.props.googleKey} posts={searchedPosts}/> :
            <div className='list-container'>
                {this.state.sortByPrice ? this.renderTrucks(sortedPosts) : this.renderTrucks(searchedPosts)}
            </div>}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        posts: state.posts.allPosts,
        googleKey: state.googleKey
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        setPost: post=>dispatch(setPost(post))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)