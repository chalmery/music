const { channels } = require('../../src/shared/constants');
const {ipcMain} = require('electron');
const config = require('../config/config.json');


ipcMain.on(channels.ADD_DIR, (event, arg) => {
    const { dir } = arg
    config.dirs.push(dir)
    console.log(dir)
    event.sender.send(channels.ADD_DIR, config.dirs);
});