import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import {LOCAL_SERVER_TOKEN} from "./tokens/local-server.token";
import {ElectronService} from "./core/services";
import {LocalServerExpressElectronService} from "./services/local-server-express-electron/local-service-express-electron.service";
import {LocalServerWebMockService} from "./services/local-server-web-mock/local-server-web-mock.service";

// AoT requires an exported function for factories
const httpLoaderFactory = (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './assets/i18n/', '.json');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        CoreModule,
        SharedModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        {
            provide: LOCAL_SERVER_TOKEN,
            useFactory: (electronService: ElectronService) => electronService.isElectron
                ? new LocalServerExpressElectronService(electronService)
                : new LocalServerWebMockService(),
            deps: [ElectronService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
