"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const supabase_1 = __importDefault(require("../../infrastructure/common/supabase"));
const GET = async (req, rep) => {
    const { data, error } = await supabase_1.default
        .from("categories")
        .select("id, title, type");
    if (error) {
        rep.status(500).send(error);
    }
    return { categories: data !== null && data !== void 0 ? data : [] };
};
exports.GET = GET;
exports.GET.opts = {};
