import React, {Component} from 'react';
import { DownOutlined, SlackOutlined, MessageOutlined, AlertOutlined } from '@ant-design/icons';
import { Layout, Badge } from 'antd';

const { Header } = Layout

class TopMenu extends Component {
    render() { 
        return ( 
            <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>           
                <div style={{float: "right"}}>
                    <span className="avatar-item" style={{fontWeight: 'bold'}} >
                        Visit Front Pages
                    </span>
                    <span className="avatar-item"> 
                        Message
                        <a>
                            <Badge size="small" count={3}>
                                    <MessageOutlined style={{ fontSize: '20px', padding: "5px"}} />
                            </Badge>
                        </a>
                    </span>
                    <span className="avatar-item">
                        Alert
                        <a >
                            <Badge size="small" count={6}>
                                <AlertOutlined style={{ fontSize: '20px', padding: "5px"}}/>
                            </Badge>
                        </a>
                    </span>
                    <span className="avatar-item">
                        <a><SlackOutlined style={{ fontSize: '24px', padding: "10px" }} />
                        </a>                       
                        <a style={{ color: "black" }} onClick={e => e.preventDefault()}>
                            Admin <DownOutlined />
                        </a>
                        
                    </span>
                </div>
            </Header>
        );
    }    
}



export default TopMenu;