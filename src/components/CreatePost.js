import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { Form, Button, TextArea, Grid, Image, Dimmer, Loader } from 'semantic-ui-react'
import {createPost} from '../actions/index'
import {connect} from 'react-redux'
import Geocode from 'react-geocode'

class CreatePost extends React.Component{

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
        photos:[],
        
    }

    handleFileChange=e=>{ 
        this.setState({
            photos:e.target.files,
            
        })
    }

    handleCreate=e=>{
        e.preventDefault()
        if (this.state.address){
            const key = this.props.googleKey
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
        else {
            let data={...this.state,
            user_id: this.props.user.id}
            this.props.createPost(data)
        }
        
        
    }

    handleX=(event,p)=>{
        this.setState({
            photos: [...this.state.photos].filter(photo => photo !== p)
        })
    }

    renderPreviewPictures=()=>{
        return [...this.state.photos].map((p ,index)=> 
            <Grid.Column key={index} width={3}>
                <Button type='button' style={{padding:5}} size='mini'onClick={(event)=>this.handleX(event,p)}>x</Button>
                <Image alt='preview' size='tiny'id='image-preview' src={ URL.createObjectURL(p)}/>
            </Grid.Column>
        )
    }
    
    handleChange=e=>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render(){
        return <div>
            <Navbar/>
            <h1 style={{padding:'30px'}}>Create post</h1>
            <div className='new-post'>
                <Form onSubmit={this.handleCreate}>
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
                    <TextArea placeholder='Description' name='description' onChange={this.handleChange} value={this.state.description}/>
                    <h3>Upload Pictures</h3>
                    {this.props.uploading ?  
                        <Dimmer active>
                            <Loader indeterminate>Uploading Files</Loader>
                        </Dimmer> :
                        <label className='ui button' htmlFor='file-upload'>Choose Files</label>
                    }
                    <input type='file' id='file-upload' hidden multiple  onChange={this.handleFileChange}/>
                    <br/>
                    <br/>
                    <Grid columns={5}>
                        {this.renderPreviewPictures()}
                    </Grid>
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
        user: state.user,
        googleKey: state.googleKey,
        uploading: state.posts.uploading
    }
}
const mapDispatchToProps = dispatch=>{
    return{
        createPost: postData=> dispatch(createPost(postData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithAuth(CreatePost))