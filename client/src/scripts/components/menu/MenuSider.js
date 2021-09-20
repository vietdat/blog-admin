import React, { Component } from 'react';
import { FlagOutlined, TeamOutlined, SlidersOutlined, UserOutlined, MenuOutlined, FileOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout

class MenuSider extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
        collapsed: !this.state.collapsed,
        });
    };
    handleClick = e => {
        console.log('click ', e);
        this.setState({
        current: e.key,
        });
    };
    render() {
        return (
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>               
                <div className='laflux' align="center">
                            <TeamOutlined/> LaFlux
                </div>
                <br/><br/>
                <Menu
                    theme="dark" mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={this.handleClick}
                >
                    <SubMenu key="sub1" icon={< UserOutlined/>} title='User Panel'>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<MenuOutlined />} title='Menu Manager'>
                        <Menu.Item key="1">Menu Types</Menu.Item>
                        <Menu.Item key="2">Menu Items</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<FlagOutlined  />} title='Banner Panel'>
                        <Menu.Item key="3">Manage Banner Category</Menu.Item>
                        <Menu.Item key="4">Manage Banners</Menu.Item>
                    </SubMenu>
                    <SubMenu key="5" icon={<SlidersOutlined />} title='Module Manager'>
                    </SubMenu>
                    <SubMenu key="6" icon={<FileOutlined  />} title='Pages'>
                    </SubMenu>
                </Menu>
            </Sider>   
        );
    }
}

export default MenuSider;