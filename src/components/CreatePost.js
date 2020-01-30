import React from 'react'
import WithAuth from './WithAuth'
import { Form, Button, TextArea, Grid, Image, Dimmer, Loader} from 'semantic-ui-react'
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
        if(e.target.files.length > 6) {
            alert('You can choose maximum 6 pictures !!!')
        }
        else
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
                <Image alt='preview' size='small' src={ URL.createObjectURL(p)}/>
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
            <br/>
            <Grid id='create-post'columns={2}>
                <Grid.Column width={7}>
                    <h1 >Create Post</h1>
                    <br/>
                    <Form onSubmit={this.handleCreate}>
                        <label>Post Title</label>
                        <Form.Input fluid placeholder='Post Title' onChange={this.handleChange} name='title' value={this.state.title}/>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Make</label>
                                <Form.Input fluid placeholder='Make' onChange={this.handleChange}name='make'value={this.state.make}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Model</label>
                                <Form.Input fluid placeholder='Model' onChange={this.handleChange}name='model'value={this.state.model}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Year</label>
                                <Form.Input fluid placeholder='Year' onChange={this.handleChange}name='model_year'value={this.state.model_year}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <Form.Input fluid placeholder='Price' onChange={this.handleChange} name='price'value={this.state.price}/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Odometer</label>
                                <Form.Input fluid placeholder='Odometer' name='odometer'onChange={this.handleChange}value={this.state.odometer}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Title Status</label>
                            <Form.Input fluid placeholder='Title Status'name='title_status' onChange={this.handleChange}value={this.state.title_status}/> 
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label>Address</label>
                            <Form.Input fluid placeholder='...123 street, City, State'name='address' onChange={this.handleChange}value={this.state.address}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                        <TextArea placeholder='Description' name='description' onChange={this.handleChange} value={this.state.description}/>
                        </Form.Field>
                        <h3>Upload Pictures</h3>
                        {this.props.uploading ?  
                            <Dimmer active>
                                <Loader indeterminate>Uploading Files</Loader>
                            </Dimmer> :
                            <label className='ui button' htmlFor='file-upload'>Choose Pictures (Maximum 6)</label>
                        }
                        <input type='file' id='file-upload' hidden multiple  onChange={this.handleFileChange}/>
                        <br/>
                        <br/>
                        <Button type='submit'>Submit</Button>
                    </Form>
                </Grid.Column>
                <Grid.Column width={7}>
                    <Grid id='preview-pictures' columns={5}>
                        {this.renderPreviewPictures()}
                    </Grid>
                </Grid.Column>
            </Grid>
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