import {useEffect, useState} from "react";
import {Tree,Button} from "antd";
import {channels} from "../../shared/constants";


const {ipcRenderer} = window.require('electron');

const getDir = () => {
    ipcRenderer.send("openDialog") // 向主进程发送 openDialog 指令
};



export default function LeftNav() {


    const [data, setData] = useState(null);


    useEffect(() => {
        // Listen for the event
        ipcRenderer.on("dirList", (event, files) => {
            console.log("回调对象"+files) //输出选择的文件
            setData(files)
        });
        // Clean the listener after the component is dismounted
        return () => {
            ipcRenderer.removeAllListeners();
        };
    }, []);

    const onSelect = (keys, info) => {
        console.log('选择的文件', keys);
        if(keys.length!==0){
            ipcRenderer.send(channels.SELECT_DIR, {
                dirs:keys
            });
        }
    };

    return (
        <div>
            <Button onClick={getDir}>选择文件</Button>
            <Tree
                onSelect={onSelect}
                treeData={data}
            />
        </div>
    )
}

