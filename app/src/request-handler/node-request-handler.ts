import {RequestHandler} from "../../../core/abstract/local-server";
import {err, ok, Result} from "../../../core/functional/result";
import {BodyType, ResponseMap} from "../../../core/abstract/response-map";
import {HTTPResponse} from "../../../core/abstract/common";
import {jsonResolver, plainTextResolver} from "./resolvers/resolvers";
import {exhaustiveCheck} from "../../../core/utils/exhaustive-check";

export class NodeRequestHandler implements RequestHandler {

    constructor(private responseMap: ResponseMap) {
    }

    setResponseMap(responseMap: ResponseMap) {
        this.responseMap = responseMap;
    }

    handleRequest(req: Request): Result<HTTPResponse, string> {
        let key = req?.url?.substring(1)

        if (key && this.responseMap[key].method.toLowerCase() === req.method.toLowerCase()) {
            let config = this.responseMap[key];

            let body = this.resolveBody(config.body);

            return ok({
                code: config.statusCode,
                body: body
            })
        }

        return err('working on that')
    }

    private resolveBody(body: BodyType): string {
        switch (body.kind) {
            case "plain":
                return plainTextResolver(body.data);
            case "json":
                return jsonResolver(body.data);
            default:
                exhaustiveCheck(body)
        }
    }

}
