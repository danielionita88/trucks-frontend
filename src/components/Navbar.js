import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Menu, Image, Divider} from 'semantic-ui-react'
import {signout} from '../actions/index'
import history from '../history'



class Navbar extends React.Component{

    handleClick=()=>{
        this.props.signout()
        localStorage.clear()
        history.push('/')
    }
    handleLogoClick=()=>{
        history.push('/')
    }

    render(){
        return <div className='navbar'>
            
            <Menu >
            <Image src={'/trucks_logo.png'} style={{cursor: 'pointer'}} onClick={this.handleLogoClick}/>
                <Menu.Item position='right'>
                    <Link to='/used-trucks'>Trucks</Link>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Link to='/new-post'>Sell Truck</Link>
                </Menu.Item>
                {this.props.user.id ? 
                    <Menu.Item position='right'>
                        <Link to='/profile'>Profile</Link> 
                    </Menu.Item>
                    : ""
                }
                <Menu.Item position='right'>
                { !this.props.user.id ? <div><Link to='/login'>Login</Link> / <Link to='/signup'>Signup</Link></div>
                :
                <Link to='' onClick={this.handleClick}>Sign Out</Link>}
                </Menu.Item>
            </Menu>
            
        </div>
    }
}


const mapStateToProps=state=>{
    
    return{
        user: state.user
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        signout: ()=>dispatch(signout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)