import React, { Component, Fragment } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';

import router, { routesTree } from '../router';

import './style.scss';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export default class BasicLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collapsed: false,
            current: '1'
        };
    }

    componentDidMount() {
        // 解决ssr刷新页面导致路由高亮不一致问题
        // 依赖于window对象，需要在服务端不执行的componentDidMount周期
        const moren = window.location.pathname;
        this.setState({
            current: moren.substring(moren.lastIndexOf('/' + 1, moren.length))
        })
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    // 非ssr情况下路由高亮
    handleClickMenu = (event, special) => {
        this.setState({
            current: event.key || special,
        });
    }


    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['Home']}
                        onClick={this.handleClickMenu}
                        selectedKeys={[this.state.current]}
                    >
                        {
                            routesTree.map(item => {
                                const { isMenu } = item;
                                if (item.children && item.children.length) {
                                    return (
                                        <SubMenu
                                            key={item.path}
                                            title={item.title}
                                        >
                                            {
                                                item.children.map(menu => (
                                                    <MenuItem
                                                        key={menu.path}
                                                    >
                                                        <Link to={`${menu.path}`}>
                                                            <span className="nav-text">{menu.title}</span>
                                                        </Link>
                                                    </MenuItem>
                                                ))
                                            }
                                        </SubMenu>
                                    )
                                }
                                return (isMenu) ? (
                                    <MenuItem
                                        key={item.path}
                                    >
                                        <Link to={`${item.path}`}>
                                            <span className="nav-text">{item.title}</span>
                                        </Link>
                                    </MenuItem>
                                ) : null
                            })
                        }

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
                            minHeight: 280
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}