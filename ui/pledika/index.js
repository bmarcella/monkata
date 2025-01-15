const electron = require('electron');

var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

const url = require('url');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// tslint:disable-next-line: only-arrow-functions
app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// tslint:disable-next-line: only-arrow-functions
app.on('activate', function() {
    if (mainWindow === null) {
        createWindow();
    }
});