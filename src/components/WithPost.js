import React from 'react'
import {connect} from 'react-redux'
import {setPost} from '../actions/index'


export default function WithPost(Component){
    class Post extends React.Component{

        componentDidMount(){console.log(this.props)
            const post = localStorage.getItem('postId')
    
            if (!post){
                this.props.history.push('/used-trucks')
            }
            else{
                const postObj= this.props.posts.find(post => post.id=== post)
                console.log(post)
                console.log(this.props.posts)
                console.log(postObj)
                this.props.setPost(postObj)
            }
        }  
        
        render(){
            return <Component {...this.props}/>
        }
    }

    const mapStateToProps=state=>{
        return{
            posts: state.posts.allPosts
        }
    }
    
    const mapDispatchToProps=dispatch=>{
        return{
            setPost: post=>dispatch(setPost(post))
        }
    }
    
    return connect(mapStateToProps, mapDispatchToProps)(Post)
}