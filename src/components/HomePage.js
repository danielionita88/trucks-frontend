import React from 'react'
import Navbar from './Navbar'
import Slideshow from './Slide'



class HomePage extends React.Component{
    render(){
        return <div>
            <Navbar/>
            <Slideshow/>
        </div>
    }
}

export default HomePage