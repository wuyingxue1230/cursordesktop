const { app, BrowserWindow } = require('electron');
const path = require('path');

// 保持对window对象的全局引用，如果不这样做的话，当JavaScript对象被
// 垃圾回收的时候，window对象将会自动的关闭
let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // 加载index.html文件
  mainWindow.loadFile('src/index.html');

  // 打开开发者工具
  // mainWindow.webContents.openDevTools();

  // 当window被关闭，这个事件会被触发
  mainWindow.on('closed', function () {
    // 取消引用window对象，如果你的应用支持多窗口的话，
    // 通常会把多个window对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    mainWindow = null;
  });
}

// Electron会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分API在ready事件触发后才能使用。
app.whenReady().then(createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', function () {
  // 在macOS上，除非用户用Cmd + Q确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (mainWindow === null) createWindow();
});

// 在这个文件中，你可以续写应用剩下主进程代码。
// 也可以拆分成几个文件，然后用require导入。