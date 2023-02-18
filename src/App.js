import { useState, useEffect } from 'react';
import {channels} from './shared/constants';
import { Layout } from 'antd';
const { Footer, Sider, Content } = Layout;

const {ipcRenderer} = window.require('electron');



function App() {
    const [product, setProduct] = useState('notebook');
    const [data, setData] = useState(null);

    const getData = () => {
        console.log(product)
        ipcRenderer.send(channels.GET_DATA, {
            product:product
        });
    };

    const getDir = () => {
        ipcRenderer.send("openDialog") // 向主进程发送 openDialog 指令
    };
    
    ipcRenderer.on("selectedItem", (event, files)=>{
        console.log(files) //输出选择的文件
    })

    useEffect(() => {
        // Listen for the event
        ipcRenderer.on(channels.GET_DATA, (event, arg) => {
            setData(arg);
        });
        // Clean the listener after the component is dismounted
        return () => {
            ipcRenderer.removeAllListeners();
        };
    }, []);

    return (
        <Layout className='layout'>
            <Layout className='layout'>
                <Sider className='siderStyle'>Sider</Sider>
                <Content className='contentStyle'><button onClick={getDir}>选择文件</button></Content>
            </Layout>
                <Footer className='footerStyle'>Footer</Footer>
        </Layout>
    );
}

export default App;
