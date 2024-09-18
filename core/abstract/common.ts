import {HttpStatusCode} from "@angular/common/http";

export type HTTPStatusCode = HttpStatusCode;
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HTTPResponse {
    code: HTTPStatusCode;
    // headers: string;
    body: string
}
