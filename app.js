const { app, BrowserWindow } = require('electron');

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 450,
    minHeight: 400,
    backgroundColor: "#FFF",
    webPreferences: {
      nodeIntegration: true
    },
    icon: 'assets/favicon.ico'
  })
  win.removeMenu();
  win.loadFile('index.html');
  // win.webContents.openDevTools()
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (win === null) createWindow();
});