import React from 'react'
import WithAuth from './WithAuth'
import Navbar from './Navbar'
import { Form } from 'semantic-ui-react'



class CreatePost extends React.Component{

    state={
        title:'',
        make:'',
        model:'',
        model_year:'',
        price:'',
        odometer:'',
        title_status:'',
        city:'',
        description:''
    }
   
    render(){
        return <div>
            <Navbar/>
            <h1>Create post</h1>
            <div className='new-post'>
                <Form>
                    <Form.Input fluid placeholder='Post Title' value={this.state.title}/>
                    <Form.Group widths='equal'>
                        <Form.Input fluid placeholder='Make' value={this.state.make}/>
                        <Form.Input fluid placeholder='Model' value={this.state.model}/>
                        <Form.Input fluid placeholder='Year' value={this.state.model_year}/>
                        <Form.Input fluid placeholder='Price' value={this.state.price}/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid placeholder='Odometer' value={this.state.odometer}/>
                        <Form.Input fluid placeholder='Title Status' value={this.state.title_status}/>
                        <Form.Input fluid placeholder='City' value={this.state.city}/>
                    </Form.Group>
                    <Form.Field control='textarea' rows='4'/>
                </Form>
            </div>
            <h3>Upload Pictures</h3>
            <Form>
                <Form.Input fluid placeholder='Make' value={this.state.make}/>  
                <Form.Input fluid placeholder='Make' value={this.state.make}/>
                <Form.Input fluid placeholder='Make' value={this.state.make}/>                
                <Form.Input fluid placeholder='Make' value={this.state.make}/>                
            </Form>
        </div>
    }
}

export default WithAuth(CreatePost)