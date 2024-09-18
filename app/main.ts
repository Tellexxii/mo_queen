import {app, BrowserWindow, screen, ipcMain} from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import {ExpressLocalServer} from "./src/express-server/server";
import {IPCMainCommand} from "./src/ipc-renderer-commands";
import {RequestHandler} from "../core/abstract/local-server";
import {NodeRequestHandler} from "./src/node-request-handler";
import {ResponseMap} from "../core/abstract/response-map";

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve'),
    dev = args.some(val => val === '--dev')

let localServer: ExpressLocalServer;

function createWindow(): BrowserWindow {

    const size = screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve),
            contextIsolation: false,
        },
    });

    if (serve) {
        const debug = require('electron-debug');
        debug();

        //win.webContents.openDevTools();

        require('electron-reloader')(module);
        win.loadURL('http://localhost:4200');
    } else {
        if (dev) {
            const debug = require('electron-debug');
            debug();

            win.webContents.openDevTools();

            require('electron-reloader')(module);
        }
        // Path when running electron executable
        let pathIndex = './index.html';

        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../dist/index.html';
        }

        const url = new URL(path.join('file:', __dirname, pathIndex));
        win.loadURL(url.href);
    }

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });

    localServer = new ExpressLocalServer();

    return win;
}

try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    app.on('ready', () => setTimeout(createWindow, 400));

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });

    addIPCHandle('server_start', (event, port: [number]) => {
        return localServer.start(port[0]);
    })

    addIPCHandle('server_stop', () => {
        return localServer.stop();
    })

    addIPCHandle('server_set-response-map', (event, responseMap: [ResponseMap]) => {
        let rh = new NodeRequestHandler(responseMap[0])
        return localServer.setHandler(rh);
    })

} catch (e) {
    // Catch Error
    // throw e;
}

function addIPCHandle(channel: IPCMainCommand, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any): void {
    ipcMain.handle(channel, listener)
}
// export interface AddOrUpdateEndpointPayload {
//
// }
