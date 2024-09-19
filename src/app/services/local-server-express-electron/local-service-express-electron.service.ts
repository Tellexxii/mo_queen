import {Injectable} from "@angular/core";
import {ElectronService} from "../../core/services";
import {Observable} from "rxjs";
import {
    LocalServer
} from "../../../../core/abstract/local-server";
import {fromPromise} from "rxjs/internal/observable/innerFrom";
import {IPCMainCommand} from "../../../../app/src/ipc-renderer-commands";
import {ResponseMap} from "../../../../core/abstract/response-map";


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
        return this.ipcInvoke('server_set-response-map', responseMap)
    }

    start(port: number) {
        return this.ipcInvoke('server_start', port);
    }

    stop() {
        return this.ipcInvoke('server_stop');
    }
}
