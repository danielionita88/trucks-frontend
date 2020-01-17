import React from 'react'
import Navbar from './Navbar'
import Slideshow from './Slideshow'



class HomePage extends React.Component{
    render(){
        return <div className='home-page'>
            <Navbar/>
            <h1>GET THAT MONEY MAKER !!!</h1>
            <Slideshow/>
        </div>
    }
}

export default HomePage