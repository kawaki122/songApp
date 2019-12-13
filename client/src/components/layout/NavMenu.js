import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Icon, Divider } from 'antd';


const NavMenu = () => {
  return (
    <div style={{ float: 'right' }}>
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px', marginLeft: '30px' }}
      >
        <Menu.Item key="3" ><Dropdown overlay={menu}>
        <Icon type="user" />
        </Dropdown></Menu.Item>
      </Menu>
    </div>
  )
}
const menu = (
  <Menu>
    <Menu.Item>
      My Profile
    </Menu.Item>
    <Divider/>
    <Menu.Item>
      <Link to="/login">Logout</Link>
    </Menu.Item>
  </Menu>
);
export default NavMenu