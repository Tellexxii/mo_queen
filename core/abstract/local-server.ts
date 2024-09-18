import {Result} from "../functional/result";
import {UnitType} from "../functional/types";
import {Observable} from "rxjs";
import {EndpointConfig, ResponseMap} from "./response-map";
import {HTTPResponse} from "./common";


export interface LocalServer {
    start(port: number): Observable<Result<UnitType, string>>;

    stop(): Observable<Result<UnitType, string>>;

    setResponseMap(responseMap: ResponseMap): Observable<Result<UnitType, string>>
}

export type AddOrUpdateEndpointPayload = {
    endpoint: string;
    config: EndpointConfig;
}

export interface LocalServerConfig {
    port: number;
    responseMap: ResponseMap;
}

export interface RequestHandler {
    handleRequest(req: Request): Result<HTTPResponse, string>;
}
