import React from 'react'
import Navbar from './Navbar'
import { Input,Menu} from 'semantic-ui-react'


class TruckList extends React.Component{
    render(){
        return<div>
            <Navbar/>
            <Menu.Menu position='right'>
                <Menu.Item>
                    <Input icon='search' placeholder='Search...' />
                </Menu.Item>
            </Menu.Menu>
        </div>
    }
}

export default TruckList