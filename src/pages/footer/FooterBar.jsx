import React from 'react'
import {Button} from "antd";

export default function FooterBar() {

    const play = ()=>{
        let audio = document.getElementById('audio');
        audio.play()
    }

    const stop = ()=>{
        let audio = document.getElementById('audio');
        audio.pause()
    }


  return (
    <div>
        <audio src="/home/yangcc/音乐/老歌/张韶涵 - 隐形的翅膀.flac" id="audio"></audio>
        <Button type="primary" onClick={play}>播放</Button>
        <Button type="primary" onClick={stop}>暂停</Button>
    </div>
  )
}
