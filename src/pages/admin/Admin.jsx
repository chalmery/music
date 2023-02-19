import React from 'react'
import {Layout} from "antd";
import LeftNav from "../leftnav/LeftNav";
const { Footer, Sider, Content } = Layout;

export default function Admin() {


  return (
      <Layout className='layout'>
        <Layout className='layout'>
          <Sider className='siderStyle'>
            <LeftNav/>
          </Sider>
          <Content className='contentStyle'>
          </Content>
        </Layout>
        <Footer className='footerStyle'>
          Footer
        </Footer>
      </Layout>
  )
}
