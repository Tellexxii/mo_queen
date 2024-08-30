import * as express from 'express';
import {Express} from "express";
import {HttpStatusCode} from "@angular/common/http";
import {attempt, err, ok, Result} from "../../../core/functional/result";
import {UnitType} from "../../../core/functional/types";
import {EndpointConfig, LocalServerConfig} from "../../../abstract/local-server";
import {ResponseMap} from "../../../abstract/response-map";

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
    app: Express;
    server: any;

    private constructor(private responseMap: ResponseMap, private port: number) {
        this.app = express();

        this.app.all('*', (req, res) => {
            console.log(this.responseMap)
            let key = req.originalUrl.substring(1)
            res.send(this.responseMap[key]?.body);
        });
    }

    start(): Result<UnitType, string> {
        this.server = this.app.listen(this.port, () => {
            //TODO: Dev console
            console.log(`Server is running at http://localhost:${this.port}`);
        });

        return ok({})
    }

    stop(): Result<UnitType, string> {
        if (this.server) {
            this.server.close(() => {
                //TODO dev console
                console.log('Server stopped');
            });

            return ok({});
        }

        return err('Server is null')
    }

    addOrUpdateEndpoint(endpoint: string, config: EndpointConfig): Result<UnitType, string> {
        console.log(endpoint, config)
        this.responseMap[endpoint] = config;
        return ok({})
        // return attempt(() => this.responseMap[endpoint] = config)
        //     .map(() => ({}))
        //     .mapErr(() => 'Can not set')
    }

    removeEndpoint(endpoint: string) {
        // return attempt(() => this.responseMap.delete(endpoint))
        //     .map(() => ({}))
        //     .mapErr(() => 'Can not remove')
    }

    static create(config: LocalServerConfig): Result<ExpressLocalServer, string> {
        if (config === null || config === undefined) {
            return err('config is null or undefined')
        }

        if (config.responseMap === null || config.responseMap === undefined) {
            return err('response map is null or undefined')
        }

        return ok(new ExpressLocalServer(config.responseMap, config.port || 3000))
    }

}
