import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { Form, Button } from 'semantic-ui-react'
import {createPost} from '../actions/index'
import {connect} from 'react-redux'

class CreatePost extends React.Component{
    constructor(props){
        super(props)
        this.fileInputRef=React.createRef()
    }

    state={
        title:'',
        make:'',
        model:'',
        model_year:'',
        price:'',
        odometer:'',
        title_status:'',
        city:'',
        description:'',
        photos:[]
    }

    handleFileChange=e=>{
        this.setState({
            photos: e.target.files[0]
        })
    }

    handleSubmit=e=>{
        e.preventDefault()
        const formData={...this.state,
            user_id: this.props.user.id
        }
        this.props.createPost(formData)
    }
    
    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){console.log(this.state)
        return <div>
            <Navbar/>
            <h1>Create post</h1>
            <div className='new-post'>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input fluid placeholder='Post Title' onChange={this.handleChange} name='title' value={this.state.title}/>
                    <Form.Group widths='equal'>
                        <Form.Input fluid placeholder='Make' onChange={this.handleChange}name='make'value={this.state.make}/>
                        <Form.Input fluid placeholder='Model' onChange={this.handleChange}name='model'value={this.state.model}/>
                        <Form.Input fluid placeholder='Year' onChange={this.handleChange}name='model_year'value={this.state.model_year}/>
                        <Form.Input fluid placeholder='Price' onChange={this.handleChange} name='price'value={this.state.price}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid placeholder='Odometer' name='odometer'onChange={this.handleChange}value={this.state.odometer}/>
                        <Form.Input fluid placeholder='Title Status'name='title_status' onChange={this.handleChange}value={this.state.title_status}/>
                        <Form.Input fluid placeholder='City'name='city' onChange={this.handleChange}value={this.state.city}/>
                    </Form.Group>
                    <Form.Field control='textarea'onChange={this.handleChange} name='description'rows='4'/>
                    <h3>Upload Pictures</h3>
                    <input type='file' onChange={this.handleFileChange}/>
                    <br/>
                    <br/>
                    <Button type='submit'>Submit</Button>
                </Form>
            </div>
        </div>
    }
}

const mapStateToProps=state=>{
    return{
        user: state.user
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        createPost: postData=> dispatch(createPost(postData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithAuth(CreatePost))