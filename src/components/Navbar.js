import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Menu, Image} from 'semantic-ui-react'
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
        return <Menu position='left'>
            <Menu.Item onClick={this.handleLogoClick}>
                <Image  id='logo' alt='logo' src={'/trucks_logo.png'} />
            </Menu.Item>
            <Menu.Item >
                <Link to='/used-trucks'>UsedTrucks</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/new-post'>Sell Truck</Link>
            </Menu.Item>
            {this.props.user.id ? 
                <Menu.Item>
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