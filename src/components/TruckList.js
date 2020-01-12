import React from 'react'
import Navbar from './Navbar'
import { Input, Grid, Image, Radio} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setPost} from '../actions/index'


class TruckList extends React.Component{

    state={
        sortByPrice: false,
        searchTerm: ''
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
        return post.photos_urls.map(url => <img src={`http://localhost:3000/${url}` } alt='truck'/>)
    }

    renderTrucks=(posts)=>{
       return posts.map(post=> <div onClick={()=>this.handlePostClick(post)} key={post.id}className='truck-card'>
                <Grid celled>
                <Grid.Row>
                <Grid.Column width={3}>
                    <Image src={`http://localhost:3000/${post.photos_urls[0]}`} />
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
        posts.sort((a,b)=> (a.price > b.price)? 1: -1)
    }
 

    render(){
        let term =this.state.searchTerm.toLowerCase()
        let searchedPosts = this.state.searchTerm ? 
            this.props.posts.filter(post=> post.make.toLowerCase().includes(term)|| post.model.toLowerCase().includes(term))
            :
            this.props.posts
        
        return<div>
            <Navbar/>
            <Input onChange={this.handleSearch}icon='search' placeholder='Search...' />
            <Radio onClick={this.handleSort} label='Sort By Price' style={{margin:15}} checked={this.state.sortByPrice}/>
            <br/>
            {this.renderTrucks(this.sortByPrice? this.sortPosts(searchedPosts): searchedPosts)}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        posts: state.posts.allPosts
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        setPost: postId=>dispatch(setPost(postId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TruckList)