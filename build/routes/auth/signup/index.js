"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const supabase_1 = __importDefault(require("../../../infrastructure/common/supabase"));
const POST = async (req, rep) => {
    var _a, _b;
    const { data, error } = await supabase_1.default.auth.signUp({
        phone: (_a = req.body) === null || _a === void 0 ? void 0 : _a.phone,
        password: (_b = req.body) === null || _b === void 0 ? void 0 : _b.password,
    });
    if (error) {
        rep.status(500).send(error);
    }
    return { user: data.user };
};
exports.POST = POST;
exports.POST.opts = {
    schema: {
        body: {
            type: "object",
            properties: {
                phone: {
                    type: "string",
                },
                password: {
                    type: "string",
                },
            },
            required: ["phone", "password"],
        },
    },
};
