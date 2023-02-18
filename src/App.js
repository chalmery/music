import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import {channels} from './shared/constants';


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
        <div className="App">
            <input
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Product name"
            />
            <button onClick={getData}>Search</button>

            {data && (
                <>
                    <h3>Product info</h3>
                    <ul>
                        <li>Name: {data.name}</li>
                        <li>Price: {data.price}</li>
                        <li>Color: {data.color}</li>
                    </ul>
                </>
            )}

            <button onClick={getDir}>选择文件</button>
        </div>
    );
}

export default App;
