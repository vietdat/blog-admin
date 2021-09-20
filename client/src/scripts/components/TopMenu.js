import React, { Component } from 'react';
import { Layout } from 'antd';
import MenuHeader from './menu/MenuHeader';
import MenuSider from './menu/MenuSider';
import MenuContent from './menu/MenuContent';
    
class TopMenu extends Component {
   
    render () {
        return (                   
            <Layout >
                <MenuSider/>            
                <Layout>                                                                 
                    <MenuHeader/>                   
                    <MenuContent/>             
                </Layout>
            </Layout>                  
        );
    }
}
  
export default TopMenu;
