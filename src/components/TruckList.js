import React from 'react'
import Navbar from './Navbar'
import { Input,Menu} from 'semantic-ui-react'
import {connect} from 'react-redux'


class TruckList extends React.Component{

    renderImages=(post)=>{
        return post.photos_urls.map(url => <img src={`http://localhost:3000/${url}`}/>)
    }

    renderTrucks=()=>{
       return this.props.posts.map(post=> <div>
        <li key={post.id}>{post.title}</li>
        {this.renderImages(post)}
       </div>)
    }

    render(){
        return<div>
            <Navbar/>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
            {this.renderTrucks()}
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        posts: state.posts.allPosts
    }
}

export default connect(mapStateToProps)(TruckList)