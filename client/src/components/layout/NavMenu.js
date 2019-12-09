import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';


const NavMenu = () => {
  return (
    <div style={{float: 'right'}}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', marginLeft: '30px' }}
      >

        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3"><Link to="/login">Logout</Link></Menu.Item>
      </Menu>
    </div>
  )
}

export default NavMenu