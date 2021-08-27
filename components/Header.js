import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from '../routes'

export class Header extends Component {
    render() {
        return (
            <Menu style={{ marginTop: '20px' }}>
                <Link route="/">
                    <a className="item">CrowdCoin</a>
                </Link>
                
                <Menu.Menu position="right">
                <Link route="/">
                    <a className="item">Campaigns</a>
                </Link>
                <Link route="/campaigns/new">
                    <a className="item">+</a>
                </Link>
                </Menu.Menu>
            </Menu>
            
        )
    }
}

export default Header
