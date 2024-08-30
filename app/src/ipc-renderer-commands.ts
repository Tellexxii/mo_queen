import {ExpressLocalServer} from "./express-server/server";

export type ServerCommand =
    'create'                    |
    'start'                     |
    'stop'                      |
    'add-or-update-endpoint'    |
    'remove-endpoint'
