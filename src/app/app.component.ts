import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { APP_CONFIG } from '../environments/environment';
import {LocalServerConfig} from "../../app/src/server";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private electronService: ElectronService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
    console.log('APP_CONFIG', APP_CONFIG);
    const config: LocalServerConfig = {port: 3001};

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
      this.electronService.ipcRenderer.invoke('create-server', config)
        .then(() => console.log('started'))
        .catch((err) => console.log(err))
      this.electronService.ipcRenderer.invoke('start-server')
        .then(() => console.log('started'))
        .catch((err) => console.log(err))
    } else {
      console.log('Run in browser');
    }
  }
}
