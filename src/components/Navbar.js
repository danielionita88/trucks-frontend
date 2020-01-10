import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Menu} from 'semantic-ui-react'
import {signout} from '../actions/index'
import history from '../history'


class Navbar extends React.Component{

    handleClick=()=>{
        this.props.signout()
        localStorage.clear()
        history.push('/home')
    }

    render(){
        return <Menu position='left'>
            <Menu.Item>
                <Link to='/used-trucks'>UsedTrucks</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/new-post'>Sell Truck</Link>
            </Menu.Item>
            <Menu.Item>
                {this.props.user.id ? <Link to='/profile'>Profile</Link> : ""}
            </Menu.Item>
            <Menu.Item position='right'>
               { !this.props.user.id ? <div><Link to='/login'>Login</Link> / <Link to='/signup'>Signup</Link></div>
               :
               <div onClick={this.handleClick}>Sign Out</div>}
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