import React from 'react'
import {Image, Button,Slider,Row,Col } from "antd";

export default function FooterBar() {

  const play = () => {
    let audio = document.getElementById('audio');
    audio.play()
  }

  const stop = () => {
    let audio = document.getElementById('audio');
    audio.pause()
  }


  return (
    <div>
      <Slider
          min={0}
          max={20}
          style={{
            width: '100%',
          }}
          // onChange={onChange}
          // value={typeof inputValue === 'number' ? inputValue : 0}
        />
      <Image
        width={50}
        height={50}
        preview={false}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        fallback="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      />
      <audio src="/home/yangcc/音乐/老歌/张韶涵 - 隐形的翅膀.flac" id="audio"></audio>
      <Button type="primary" onClick={play}>播放</Button>
      <Button type="primary" onClick={stop}>暂停</Button>
    </div>
  )
}
