import {Injectable} from "@angular/core";
import {ElectronService} from "../../core/services";
import {Observable, of, switchMap} from "rxjs";
import {AddOrUpdateEndpointPayload, LocalServer, LocalServerConfig} from "../../../../abstract/local-server";
import {Result} from "../../../../core/functional/result";
import {UnitType} from "../../../../core/functional/types";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {Option} from "../../../../core/functional/option";
import {ResponseMap} from "../../../../abstract/response-map";


@Injectable(
    {providedIn: 'root'}
)
export class LocalServerExpressElectronService implements LocalServer {
    private readonly ipcInvoke!: (channel: string, ...args: any[]) => Observable<any>

    constructor(private readonly electronService: ElectronService) {
        this.ipcInvoke = (channel, ...args) =>
            fromPromise(this.electronService.ipcRenderer.invoke(channel, args))
    }

    getResponseMap(): Observable<Option<ResponseMap>> {
        throw new Error("Method not implemented.");
    }
    removeEndpoint(): Observable<Result<UnitType, string>> {
        throw new Error("Method not implemented.");
    }

    create(config: LocalServerConfig) {
        return of(this.electronService.ipcRenderer.invoke('create-server', config))
    }

    start(port: number) {
        return this.create({port: port, responseMap: {}}).pipe(
            switchMap(() => this.ipcInvoke('start-server'))
        )
    }

    stop() {
        return this.ipcInvoke('stop-server');
    }

    addOrUpdateEndpoint(payload: AddOrUpdateEndpointPayload) {
        return this.ipcInvoke('add-or-update-endpoint', payload)
    }
}
