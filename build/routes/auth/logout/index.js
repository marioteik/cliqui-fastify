"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const supabase_1 = __importDefault(require("../../../infrastructure/common/supabase"));
const GET = async (req, rep) => {
    const { error } = await supabase_1.default.auth.signOut();
    if (error) {
        rep.status(500).send(error);
    }
    rep.status(200).send({ message: "Logged out" });
};
exports.GET = GET;
exports.GET.opts = {};
