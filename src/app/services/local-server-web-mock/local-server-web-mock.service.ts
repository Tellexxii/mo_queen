import {Injectable} from "@angular/core";
import {AddOrUpdateEndpointPayload, LocalServer} from "../../../../core/abstract/local-server";
import {Observable, of} from "rxjs";
import {ResponseMap} from "../../../../core/abstract/response-map";
import {Option, some} from "../../../../core/functional/option";
import {ok, Result} from "../../../../core/functional/result";
import {UnitType} from "../../../../core/functional/types";


@Injectable(
    {providedIn: 'root'}
)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export class LocalServerWebMockService implements LocalServer {
    start(port: number): Observable<Result<UnitType, string>> {
        console.log('WebMock started on port: ', port)
        return of(ok<UnitType, string>({}))
    }
    stop(): Observable<Result<UnitType, string>> {
        console.log('WebMock stopped');
        return of(ok<UnitType, string>({}))
    }
    addOrUpdateEndpoint(payload: AddOrUpdateEndpointPayload): Observable<Result<UnitType, string>> {
        console.log('WebMock set payload: ', payload)
        return of(ok<UnitType, string>({}))
    }
    removeEndpoint(endpoint: string): Observable<Result<UnitType, string>> {
        console.log('WebMock remove endpoint: ', endpoint)
        return of(ok<UnitType, string>({}))
    }
    getResponseMap(): Observable<Option<ResponseMap>> {
        return of(some({}));
    }

}
