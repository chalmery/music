const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const { channels } = require('../src/shared/constants');
const fs = require('fs');
const { parseFile } = require('music-metadata');

const fileTypeList = ['FLAC', 'flac', 'MP3', 'mp3','ape','APE','MPEG']

function createWindow() {
  // const startUrl = process.env.ELECTRON_START_URL;
  // console.log(startUrl)

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    icon: '/home/yangcc/code/js-code/music/public/logo192.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('./build/index.html')
  // win.loadURL(startUrl)
  // win.show()
  // Open the DevTools.
  // window.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


ipcMain.on('openDialog', (event) => {
  let files = dialog.showOpenDialogSync({
    title: '选择文件路径',
    properties: ['openDirectory', 'multiSelections']
  });
  if (files !== undefined) {
    // 向子进程输出  命令
    let dirs = []
    files.forEach(file => {
      let split = file.split('/');
      let value = split[split.length - 1];
      let dirJson = {
        title: value,
        key: file

      }
      dirs.push(dirJson)
    })
    event.reply("dirList", dirs)
  }
})


/**
 * 拿到传来的文件夹名称
 */
ipcMain.on(channels.SELECT_DIR, (event, args) => {
  //同步读取文件夹下的文件
  let files = fs.readdirSync(args.dirs[0])
  if (files === undefined || files === null || files.length === 0) {
    return
  }
  //拼接每个文件的路径
  let filePaths = []
  files.forEach(file => {
    let filePath = args.dirs[0] + "/" + file;
    let info = fs.statSync(filePath);
    if (info.isFile()) {
      filePaths.push(filePath)
    }
  })
  if (filePaths.length === 0) {
    return
  }

  //解析文件对象
  async function getMetadata() {
    const promises = [];
    filePaths.forEach(filePath => {
      promises.push(parseFile(filePath));
    })
    await Promise.allSettled(promises).then((args) => {
      let metadataList = []
      for (let i = 0; i < args.length; i++) {
        let value = args[i].value;
        if (value !== undefined && fileTypeList.includes(value.format.container)) {
          let metadata = {
            key: i,
            title: value.common.title,
            artist: value.common.artist,
            album: value.common.album,
            picture: null,
            path: filePaths[i],
            duration: value.format.duration,
            type: value.format.container
          }
          if (value.common.picture !== undefined && value.common.picture.length !== 0) {
            metadata.path = value.common.picture[0].data
          }
          metadataList.push(metadata)
        }
      }
      event.reply("metadataList", metadataList)
    });
  }

  getMetadata();
});