import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { Form, Button } from 'semantic-ui-react'
import {createPost} from '../actions/index'
import {connect} from 'react-redux'
import Geocode from 'react-geocode'

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
        description:'',
        address: '',
        photos:[]
    }

    handleFileChange=e=>{ 
        this.setState({
            photos:e.target.files
        })
    }

    handleSubmit=e=>{
        e.preventDefault()
        const key = "AIzaSyBdcUzOoj5uRW41DAZvPZnhbSmfAsarkw0"
        Geocode.setApiKey(key)
        Geocode.fromAddress(`${this.state.address}`)
        .then(response => {
            const { lat, lng } = response.results[0].geometry.location
            let data={...this.state,
                user_id: this.props.user.id,
                lat: lat,
                lng: lng
            }
            this.props.createPost(data)
        })
        
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
                    </Form.Group>
                    <Form.Input fluid placeholder='Address "...123 street, City, State"'name='address' onChange={this.handleChange}value={this.state.address}/>
                    <h3>Upload Pictures</h3>
                    <input type='file' multiple onChange={this.handleFileChange}/>
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