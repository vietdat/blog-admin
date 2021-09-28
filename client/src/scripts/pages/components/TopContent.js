import React, { Component } from 'react';
import { Row, Col, Layout, Menu, message, Select, Table, Checkbox } from 'antd';
import { UserOutlined, MailOutlined, MenuOutlined, FileOutlined } from '@ant-design/icons';

const {Content} = Layout

const onClick = ({ key }) => {
    message.info(`Click on item ${key}`);
};

const renderIcon = (iconName) => {
	if (iconName === 'MenuOutlined') {
		return <MenuOutlined />
	} else if (iconName === 'FileOutlined'){
		return <FileOutlined />
	} else if (iconName === 'UserOutlined'){
		return <UserOutlined />
	}
	return '';
}

const renderContentMenu = (data) => {
	return <div>
    {renderIcon(data.icon)}
    {' '}{data.text}
	</div>
}

const renderContentEdit = (data) => {
	return <div>
		<Checkbox checked={data}></Checkbox>
	</div>
}

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

        key: 'menus',
        render: renderContentMenu

    },
    {
        title: 'First Name',
        dataIndex: 'name',
        key: 'name',
        
    },
    {
        title: 'Last Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Edit',
        dataIndex: 'Edit',
        key: 'Edit',
        render: renderContentEdit
    },
   
]
const data = [
    {
        key: '1',
        Menus: `<div>
                    <MenuOutlined/>
                </div>`,
        Menus: {icon: 'MenuOutlined', text: 'Menu manager'},
        FirstName: '',
        LastName: '',
        Email: '',
        Edit: true,        
    },
    {
        key: '2',
        Menus: {icon: 'FileOutlined', text: 'Menu Types'},
        FirstName: '',
        LastName: '',
        Email: '',
        Edit: false,       
	},
    {
        key: '3',
        Menus: {icon: 'UserOutlined', text: 'Menu Item'},
        FirstName: '',
        LastName: '',
        Email: '',
        Edit: true,        
    },
]

class TopContent extends Component {
    render() {
        return (
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
                }} >
                    Manage User Group Privilege
                </Content> <br></br>
                <Content style={{
                background: "white",
                borderWidth: 1,
                padding: 24,
                }}>
                    <p style={{ fontSize: 16, fontWeight: 'bold'}}> User Group </p>
                    <Select defaultValue="Super Admin" style={{ width: 500 }} allowClear>
                        <Option value="Super Admin"> Super Admin </Option>
                    </Select> <br></br><br></br>
                    <Table columns={columns} dataSource={data} ></Table>
                </Content>
                <Content className="profile" align="center">
					<Row align="center" justify="center">
						<Col span={8} flex>
							<h2>
								Table
							</h2>
						</Col>
					</Row>
					<Row align="center" justify="center">
						<Col span={8} flex>
							<UserOutlined /> Name: {this.props.firstName + ' ' + this.props.lastName}
						</Col>
					</Row>
					<Row align="center" justify="center">
						<Col span={8} flex>
							<MailOutlined /> Email: {this.props.email}
						</Col>
					</Row>
				</Content>
            </Content> 
        );
    }
}

export default TopContent;