import React, {Component} from 'react';
import { Layout, Menu, Dropdown, message, Badge, Select,Table } from 'antd';
import { DownOutlined, SlackOutlined, MessageOutlined, AlertOutlined , UserOutlined, MenuOutlined, FlagOutlined, FileOutlined, MenuUnfoldOutlined, MenuFoldOutlined, TeamOutlined, SlidersOutlined  } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
  };
  
const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">1st menu item</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
      <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);
const { Option } = Select;
const columns = [
    {
      title: 'Menus',
      dataIndex: 'Menus',
      key: 'name',
      render: html => <div dangerouslySetInnerHTML={{__html: html}}/>,
    },
    {
        title: 'Order',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'View',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Add',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Edit',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Delete',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'All',
        dataIndex: 'name',
        key: 'name',
      },
]
const data = [
    {
      key: '1',
      Menus: `<div>
                  <MenuOutlined/>
              </div>`,
      Order: '',
      View: '',
      Add: '',
      Edit: '',
      Delete: '',
      All: ''
    },
    {
        key: '2',
        Menus: 'Menu Types',
        Order: '',
        View: '',
        Add: '',
        Edit: '',
        Delete: '',
        All: ''
      },
    {
    key: '3',
    Menus: 'Menu Items',
    Order: '',
    View: '',
    Add: '',
    Edit: '',
    Delete: '',
    All: ''
    },
    {
    key: '4',
    Menus: 'Banner Panel',
    Order: '',
    View: '',
    Add: '',
    Edit: '',
    Delete: '',
    All: ''
    },
    {
        key: '5',
        Menus: 'Manage Banner Category',
        Order: '',
        View: '',
        Add: '',
        Edit: '',
        Delete: '',
        All: ''
      },
      {
        key: '6',
        Menus: 'Manage Banners',
        Order: '',
        View: '',
        Add: '',
        Edit: '',
        Delete: '',
        All: ''
      },
      {
        key: '7',
        Menus: 'Module Manager',
        Order: '',
        View: '',
        Add: '',
        Edit: '',
        Delete: '',
        All: ''
      }
      
    ]

class TopMenu extends Component {
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
            
                 <Layout > 
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

                            <SubMenu key="5" icon={<SlidersOutlined />} title='Module Manager' >
                            
                            </SubMenu>

                            <SubMenu key="6" icon={<FileOutlined  />} title='Pages'>
                            
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}> 
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                            })}
                                <div style={{float: "right"}}>
                                    <span className="avatar-item" style={{fontWeight: 'bold'}} >Visit Front Pages</span>
                                    <span className="avatar-item"> Message                            
                                    <a>
                                        <Badge size="small" count={3}>
                                             <MessageOutlined style={{ fontSize: '20px', padding: "5px"}} />
                                        </Badge>
                                    </a>
                                    </span>
                                    <span className="avatar-item">Alert
                                    <a >
                                     <Badge size="small" count={6}>  
                                        <AlertOutlined style={{ fontSize: '20px', padding: "5px"}}/>
                                    </Badge>
                                    </a>
                                    </span>
                                    <span className="avatar-item">
                                        <a><SlackOutlined style={{ fontSize: '24px', padding: "10px" }} /></a>
                                        <Dropdown overlay={menu}>
                                        <a style={{ color: "black" }} onClick={e => e.preventDefault()}>
                                        Admin <DownOutlined />
                                        </a>
                                        </Dropdown>
                                    </span>  
                                </div>                       
                        </Header>                     
                        <Content
                            className="site-layout-background"
                            style={{
                            margin: '24px 16px',
                                                      
                            }}
                        >
                            <Content style={{
                            background: "white",
                            borderWidth: 1,
                            padding: 24, 
                            fontSize: 24,
                            }} >Manage User Group Privilege</Content> <br></br>
                            <Content style={{
                            background: "white",
                            borderWidth: 1,
                            padding: 24,
                            
                            }}>
                                <p style={{ fontSize: 16, fontWeight: 'bold'}}>User Group </p>
                                <Select defaultValue="Super Admin" style={{ width: 500 }} allowClear>
                                    <Option value="Super Admin">Super Admin</Option>
                                </Select> <br></br><br></br>
                                <Table columns={columns} dataSource={data} />
                            </Content>
                        </Content>      
                    </Layout>
                </Layout>
           
        );
    }
}

export default TopMenu;