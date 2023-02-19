const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')


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
  console.log("文件对象"+files)
  if (files !== undefined) {
    // 向子进程输出  命令
    let dirs = []
    files.forEach(file=>{
        let split = file.split('/');
        let value = split[split.length-1];
        let dirJson = {
            title : value,
            key : file
    
        }
        dirs.push(dirJson)
    })
    event.reply("dirList", dirs)
  }
})