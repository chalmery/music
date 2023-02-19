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
        console.log('Trigger Select', keys, info);
    };
    const onExpand = (keys, info) => {
        console.log('Trigger Expand', keys, info);
    };

    return (
        <div>
            <Button onClick={getDir}>选择文件</Button>
            <Tree
                onSelect={onSelect}
                onExpand={onExpand}
                treeData={data}
            />
        </div>
    )
}

