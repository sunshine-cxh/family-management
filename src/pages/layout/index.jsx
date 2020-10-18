import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import icons from '../../utils/icons';
import './index.less';
import logo from '../../assets/logo.jpeg';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class MyLayout extends Component {
  state = {
    collapsed: false,
    selectedKeys: JSON.parse(localStorage.getItem('selectedKeys')) || ['1'],
    menus: [
      {
        key: '1',
        icon: 'PieChartOutlined',
        title: '首页',
      },
      {
        key: '2',
        icon: 'DollarCircleOutlined',
        title: '收入支出',
      },
      {
        key: '5',
        icon: 'ScheduleOutlined',
        title: '减肥计划',
      },
      {
        key: '6',
        icon: 'ReconciliationOutlined',
        title: '戒烟计划',
      },
      {
        key: '12',
        icon: 'VerifiedOutlined',
        title: '订婚计划',
      },
      {
        key: '13',
        icon: 'WomanOutlined',
        title: '备孕计划',
      },
      {
        key: '7',
        icon: 'HeatMapOutlined',
        title: '权限管理',
        children: [
          {
            key: '8',
            icon: 'UserAddOutlined',
            title: '用户管理',
          },
          {
            key: '9',
            icon: 'UsergroupAddOutlined',
            title: '角色管理',
          },
          {
            key: '10',
            icon: 'MenuOutlined',
            title: '菜单管理',
          },
        ],
      },
    ],
  };

  // 左侧菜单整体收起和展开
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  // 渲染左侧菜单
  getMenus = (menus) => {
    return menus.map((menu) => {
      const icon = icons[menu.icon];
      if (!menu.children) {
        return (
          <Menu.Item key={menu.key} icon={icon}>
            {!this.state.collapsed && menu.title}
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={menu.key} icon={icon} title={menu.title}>
            {this.getMenus(menu.children)}
          </SubMenu>
        );
      }
    });
  };

  // 解决刷新选中key失效问题
  handleSelect = ({ selectedKeys }) => {
    this.setState({
      selectedKeys,
    });
    localStorage.setItem('selectedKeys', JSON.stringify(selectedKeys));
  };

  // 默认是否展开2级菜单
  handleOpenKeys = (arr) => {
    const { selectedKeys } = this.state;
    let key = '';
    // 先过滤掉一级菜单
    const cmenus = arr.filter((item) => item.children);
    // 看每一个二级菜单内部的key是否和这个selectedKeys相同,如果相同，应该返回该二级菜单的父级key
    for (let i = 0; i < cmenus.length; i++) {
      const item = cmenus[i];
      for (let j = 0; j < cmenus[i].children.length; j++) {
        if (!cmenus[i].children[j].children) {
          const ckey = cmenus[i].children[j].key;
          if (ckey === selectedKeys[0]) {
            key = cmenus[i].key;
          }
        } else {
          this.handleOpenKeys(item.children);
        }
      }
    }
    return [key ? key : '0'];
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className={`logo ${this.state.collapsed ? 'ishidden' : ''}`}>
            <img src={logo} alt="logo" />
            <h1 className={this.state.collapsed ? 'ishidden' : ''}>幸福计划</h1>
          </div>
          <Menu
            theme="dark"
            defaultSelectedKeys={this.state.selectedKeys}
            defaultOpenKeys={this.handleOpenKeys(this.state.menus)}
            mode="inline"
            onSelect={this.handleSelect}
          >
            {this.getMenus(this.state.menus)}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {/* 在这里渲染面包屑 */}
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {/* 在这里渲染组件 */}
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
