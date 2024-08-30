import {Result} from "../core/functional/result";
import {UnitType} from "../core/functional/types";
import {Observable} from "rxjs";
import Option from "../core/functional/option/Option";
import {HttpStatusCode} from "@angular/common/http";
import {ResponseMap} from "./response-map";

export interface LocalServer {
    start(port: number): Observable<Result<UnitType, string>>;
    stop(): Observable<Result<UnitType, string>>;
    addOrUpdateEndpoint(payload: AddOrUpdateEndpointPayload): Observable<Result<UnitType, string>>;
    removeEndpoint(endpoint: string): Observable<Result<UnitType, string>>;
    getResponseMap(): Observable<Option<ResponseMap>>
}

export type AddOrUpdateEndpointPayload = {
    endpoint: string;
    config: EndpointConfig;
}

export interface LocalServerConfig {
    port: number;
    responseMap: ResponseMap;
}

export interface EndpointConfig {
    statusCode: HttpStatusCode,
    //TODO here is the interesting part
    body?: string
}
