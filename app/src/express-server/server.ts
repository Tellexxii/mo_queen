import * as express from 'express';
import {Express} from "express";
import {err, match, ok, Result} from "../../../core/functional/result";
import {UnitType} from "../../../core/functional/types";
import {RequestHandler} from "../../../core/abstract/local-server";
import {HTTPResponse} from "../../../core/abstract/common";

const app = express();
let server: any;
let port = 3000;

app.all('*', (req, res) => {
    res.send('Hello World!');
});

export function startServer(newPort: number = 3000) {
    port = newPort;
    server = app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export function stopServer() {
    if (server) {
        server.close(() => {
            console.log('Server stopped');
        });
    }
}

export class ExpressLocalServer {
    _responseHandler: RequestHandler = ({
        handleRequest(req: Request): Result<HTTPResponse, string> {
            return err('response handler is not set')
        }
    });
    private _isRunning = false;
    private app: Express;
    private server: any;


    constructor() {
        this.app = express();
    }

    setHandler(handler: RequestHandler) {
        console.log('setHandler', handler);
        this._responseHandler = handler;
    }

    start(port: number): Result<UnitType, string> {
        if (this._isRunning) return err('Server already started')

        this.app.all('*', (req, res) => {
            // @ts-ignore
            let result: Result<HTTPResponse, string> = this._responseHandler.handleRequest(req);

            match(result,
                (response) => res.status(response.code).send(response.body),
                (err) => res.status(500).send(err))
        });

        this.server = this.app.listen(port, () => {
            //TODO: Dev console
            console.log(`Server is running at http://localhost:${port}`);
        });

        this._isRunning = true;

        return ok({})
    }

    stop(): Result<UnitType, string> {
        if (this.server) {
            this.server.close(() => {
                //TODO dev console
                console.log('Server stopped');
            });

            this._isRunning = false;

            return ok({});
        }

        return err('Server is null')
    }

}
