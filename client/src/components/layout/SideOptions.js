import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const SideOptions=()=>{
    return(
        <div>
          <div className="logo"><h1 style={{color: '#ffffff'}}>Music App</h1></div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="0">
            <Link to="/">
              <Icon type="dashboard" />
              <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="1">
            <Link to="/songs">
              <Icon type="customer-service" />
              <span>Songs</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
            <Link to="/authors">
              <Icon type="team" />
              <span>Authors</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/albums">
              <Icon type="folder" />
              <span>Albums</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/users">
              <Icon type="team" />
              <span>Users</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div> 
    )
}

export default SideOptions