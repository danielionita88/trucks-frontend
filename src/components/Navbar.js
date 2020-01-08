import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { Menu} from 'semantic-ui-react'


class Navbar extends React.Component{
    render(){
        return <Menu>
            <Menu.Item>
                <Link to='/used-trucks'>UsedTrucks</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to='/new-post'>Sell Truck</Link>
            </Menu.Item>
            <Menu.Item>
               { !this.props.user.id ? <div><Link to='/login'>Login</Link> / <Link to='/signup'>Signup</Link></div>
               :
               ""}
            </Menu.Item>
        </Menu>
    }
}


const mapStateToProps=state=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Navbar)