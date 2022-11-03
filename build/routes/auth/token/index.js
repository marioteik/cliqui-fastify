"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const supabase_1 = __importDefault(require("../../../infrastructure/common/supabase"));
const POST = async (req, rep) => {
    const { data: { session, user }, error, } = await supabase_1.default.auth.verifyOtp({
        type: "sms",
        phone: req.body.phone,
        token: req.body.token,
    });
    if (error) {
        rep.status(500).send(error);
    }
    rep.status(200).send({ session: session, user: user });
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
                token: {
                    type: "string",
                },
            },
            required: ["phone", "token"],
        },
    },
};
