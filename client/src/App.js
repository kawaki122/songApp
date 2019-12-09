import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'antd/dist/antd.css';
import SideOptions from './components/layout/SideOptions'
import NavMenu from './components/layout/NavMenu'
import Home from './components/home/Home'
import Login from './components/auth/SignIn'
const { Footer, Sider, Header } = Layout;

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
              <Route exact path='/' component={Home} />
              <Footer>footer</Footer>
            </Layout>
          </Layout>
        </Switch>
      </BrowserRouter>
    )
  }
}


export default App;