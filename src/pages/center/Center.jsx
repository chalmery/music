import React, {useEffect, useState} from 'react'
import { Table } from 'antd';


const {ipcRenderer} = window.require('electron');

export default function Center() {
    const columns = [
        {
            title: '名称',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '作者',
            dataIndex: 'artist',
            key: 'artist',
        },
        {
            title: '专辑',
            dataIndex: 'album',
            key: 'album',
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        },
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        // Listen for the event
        ipcRenderer.on("metadataList", (event, metadataList) => {
            console.log(metadataList)
            setData(metadataList)
        });
        // Clean the listener after the component is dismounted
        return () => {
            ipcRenderer.removeAllListeners();
        };
    }, []);

    return (
        <div>
            <Table
                pagination={false}
                columns={columns}
                dataSource={data} />
        </div>
    )
}
