import {Injectable} from "@angular/core";
import {ElectronService} from "../../core/services";
import {Observable, of} from "rxjs";
import {AddOrUpdateEndpointPayload, LocalServer, LocalServerConfig} from "../../../../core/abstract/local-server";
import {Result} from "../../../../core/functional/result";
import {UnitType} from "../../../../core/functional/types";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {Option} from "../../../../core/functional/option";
import {ResponseMap} from "../../../../core/abstract/response-map";
import {IPCMainCommand} from "../../../../app/src/ipc-renderer-commands";


@Injectable(
    {providedIn: 'root'}
)
export class LocalServerExpressElectronService implements LocalServer {
    private readonly ipcInvoke!: (channel: IPCMainCommand, ...args: any[]) => Observable<any>

    constructor(private readonly electronService: ElectronService) {
        this.ipcInvoke = (channel, ...args) =>
            fromPromise(this.electronService.ipcRenderer.invoke(channel, args))
    }

    setResponseMap(responseMap: ResponseMap) {
        return this.ipcInvoke('server_set-responseMap', responseMap)
    }

    createEndpoint(): Observable<Result<UnitType, string>> {
        throw new Error("Method not implemented.");
    }

    getResponseMap(): Observable<Option<ResponseMap>> {
        throw new Error("Method not implemented.");
    }
    removeEndpoint(): Observable<Result<UnitType, string>> {
        throw new Error("Method not implemented.");
    }

    private create(config: LocalServerConfig) {
        return of(this.electronService.ipcRenderer.invoke('create-server', config))
    }

    start(port: number) {
        return this.ipcInvoke('server_start', port);
    }

    stop() {
        return this.ipcInvoke('server_stop');
    }

    addOrUpdateEndpoint(payload: AddOrUpdateEndpointPayload) {
        return this.ipcInvoke('server_add-or-update-endpoint', payload)
    }
}
