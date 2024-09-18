import {RequestHandler} from "../../core/abstract/local-server";
import {err, Result} from "../../core/functional/result";
import {ResponseMap} from "../../core/abstract/response-map";
import {HTTPResponse} from "../../core/abstract/common";

export class NodeRequestHandler implements RequestHandler {

    constructor(private responseMap: ResponseMap) {
    }

    handleRequest(req: Request): Result<HTTPResponse, string> {
        console.log(req);
        let key = req?.url?.substring(1)
        return err('working on that')
    }

}
