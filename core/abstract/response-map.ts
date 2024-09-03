import {HTTPMethod, HTTPStatusCode} from "./common";

export type ResponseMap = Record<string, EndpointConfig>;

export type PlainBody = { kind: 'plain', data: string };
export type JSONBody = { kind: 'json', data: string };

export type BodyType = PlainBody | JSONBody;

export interface EndpointConfig {
    method: HTTPMethod
    statusCode: HTTPStatusCode,
    body: BodyType;
}
