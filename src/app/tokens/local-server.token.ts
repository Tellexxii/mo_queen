import {InjectionToken} from "@angular/core";
import {LocalServer} from "../../../abstract/local-server";

export const LOCAL_SERVER_TOKEN = new InjectionToken<LocalServer>('Token for local server implementation');
