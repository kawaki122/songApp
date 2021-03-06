import React, { Component, Fragment } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css';
import SideOptions from './components/layout/SideOptions'
import NavMenu from './components/layout/NavMenu'
import Home from './components/home/Home'
import Login from './components/auth/SignIn'
import Authors from './components/Author/Authors'
import Albums from './components/Album/Albums'
import Songs from './components/Songs/Songs'
import Users from './components/Users/Users'
const { Footer, Sider, Header, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login} />
          <Layout className="layout">
            <Sider trigger={null} collapsible collapsed={false}>
              <SideOptions />
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <NavMenu />
              </Header>
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                <Route exact path='/' component={Home} />
                <Route path='/songs' component={Songs} />
                <Route path='/authors' component={Authors} />
                <Route path='/albums' component={Albums} />
                <Route path='/users' component={Users} />
              </Content>
              <Footer>footer</Footer>
            </Layout>
          </Layout>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;