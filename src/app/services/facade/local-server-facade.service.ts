import {inject, Injectable} from '@angular/core';
import {AddOrUpdateEndpointPayload, LocalServer} from "../../../../core/abstract/local-server";
import {LOCAL_SERVER_TOKEN} from "../../tokens/local-server.token";
import {Observable, of} from "rxjs";
import Result from "../../../../core/functional/result/Result";
import {UnitType} from "../../../../core/functional/types";
import {ok} from "../../../../core/functional/result";
import {HttpStatusCode} from "@angular/common/http";
import {ResponseMap} from "../../../../core/abstract/response-map";

@Injectable({
    providedIn: 'root'
})
export class LocalServerFacadeService {
    private readonly _localServer: LocalServer;
    private readonly responseMap: ResponseMap;

    constructor() {
        this._localServer = inject(LOCAL_SERVER_TOKEN);
        this.responseMap = {'posts': {body: {kind: 'plain', data: 'some posts'}, method: "GET", statusCode: HttpStatusCode.Ok}}

        this._localServer.setResponseMap(this.responseMap);
    }

    start(port: number): ReturnType<LocalServer['start']> {
        return this._localServer.start(port);
    }

    stop(): ReturnType<LocalServer['stop']> {
        return this._localServer.stop();
    }

    addOrUpdateEndpoint(payload: AddOrUpdateEndpointPayload): Observable<Result<UnitType, string>> {
        console.log(payload);
        this.responseMap['posts'].body.data = 'new';
        this._localServer.setResponseMap(this.responseMap);
        return of(ok<UnitType, string>({}))
    }
}
