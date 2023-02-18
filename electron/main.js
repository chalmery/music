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
  let file = dialog.showOpenDialogSync({
    title: '选择文件路径',
    properties: ['openDirectory', 'multiSelections']
  });
  if (file !== undefined) {
    console.log(file.filePaths) //输出结果
    // 向子进程输出 selectedItem 命令
    event.reply("selectedItem", file.filePaths)
  }
})