import React from 'react'
import Navbar from './Navbar'
import { Input,Menu, Grid, Image, Radio} from 'semantic-ui-react'
import {connect} from 'react-redux'


class TruckList extends React.Component{

    state={
        searchTerm: ''
    }

    handleSearch=e=>{
        this.setState({
            searchTerm: e.target.value
        })
    }

    renderImages=(post)=>{
        return post.photos_urls.map(url => <img src={`http://localhost:3000/${url}` } alt='truck'/>)
    }

    renderTrucks=(posts)=>{
       return posts.map(post=> <div key={post.id}className='truck-card'>
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

    render(){
        const term=this.state.searchTerm.toLowerCase()
        const filterPosts= this.props.posts.filter(post=> post.make.toLowerCase().includes(term))
        const posts = this.state.searchTerm ? filterPosts : this.props.posts
        return<div>
            <Navbar/>
            <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input onChange={this.handleSearch}icon='search' placeholder='Search...' />
                    </Menu.Item>
            </Menu.Menu>
            {this.renderTrucks(posts)}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        posts: state.posts.allPosts
    }
}

export default connect(mapStateToProps)(TruckList)