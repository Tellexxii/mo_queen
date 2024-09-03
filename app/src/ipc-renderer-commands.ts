import {ExpressLocalServer} from "./express-server/server";

export type IPCServerCommand =
    'start'                     |
    'stop'                      |
    'add-or-update-endpoint'    |
    'remove-endpoint'           |
    'set-responseMap'

export type IPC_FSCommand = 'open'


export type IPCMainCommand = `server_${IPCServerCommand}` | `fs_${IPC_FSCommand}`;

