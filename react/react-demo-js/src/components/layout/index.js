import React, {Component} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import Demo1 from '../../pages/Demo1/index';
import Demo2 from '../../pages/Demo2/index';
import Demo3 from '../../pages/Demo3/index';
import './index.css';

const { Header, Sider, Content } = Layout;

class AppLayout extends Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  };
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <BrowserRouter>
              <Route path="/demo1/" component={Demo1}></Route>
              <Route path="/demo2" component={Demo2}></Route>
              <Route path="/demo3" component={Demo3}></Route>
            </BrowserRouter>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
