import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Navbar extends React.Component{
    render(){console.log(this.props)
        return <div>
            <Link to='/used-trucks'>UsedTrucks</Link>
            <Link to='/new-post'>Sell Truck</Link>
        
            <div><Link to='/login'>Login</Link> / <Link to='/signup'>Signup</Link></div>
            
        </div>
    }
}


const mapStateToProps=state=>{
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(Navbar)