import {Result} from "../functional/result";
import {UnitType} from "../functional/types";
import {Observable} from "rxjs";
import Option from "../functional/option/Option";
import {EndpointConfig, ResponseMap} from "./response-map";


export interface LocalServer {
    start(port: number): Observable<Result<UnitType, string>>;

    stop(): Observable<Result<UnitType, string>>;

    createEndpoint(): Observable<Result<UnitType, string>>

    addOrUpdateEndpoint(payload: AddOrUpdateEndpointPayload): Observable<Result<UnitType, string>>;

    removeEndpoint(endpoint: string): Observable<Result<UnitType, string>>;

    setResponseMap(responseMap: ResponseMap): Observable<Result<UnitType, string>>

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
