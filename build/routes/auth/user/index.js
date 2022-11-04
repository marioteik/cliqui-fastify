"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const supabase_1 = __importDefault(require("../../../infrastructure/common/supabase"));
const GET = async (req, rep) => {
    var _a, _b;
    const [_, token] = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")) !== null && _b !== void 0 ? _b : [];
    const { data, error } = await supabase_1.default.auth.getUser(token);
    if (error) {
        rep.status(401).send(error);
    }
    return { user: data.user };
};
exports.GET = GET;
exports.GET.opts = {
    schema: {
        headers: {
            type: "object",
            properties: {
                authorization: {
                    type: "string",
                },
            },
            required: ["authorization"],
        },
    },
};
