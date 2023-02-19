import React from 'react'
import {Layout} from "antd";
import LeftNav from "../leftnav/LeftNav";
import FooterBar from '../footer/FooterBar';
import Center from '../center/Center';
const { Footer, Sider, Content } = Layout;

export default function Admin() {


  return (
      <Layout className='layout'>
        <Layout className='layout'>
          <Sider className='siderStyle'>
            <LeftNav/>
          </Sider>
          <Content className='contentStyle'>
            <Center/>
          </Content>
        </Layout>
        <Footer className='footerStyle'>
          <FooterBar/>
        </Footer>
      </Layout>
  )
}
