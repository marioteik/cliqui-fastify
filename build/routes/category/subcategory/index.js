"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const supabase_1 = __importDefault(require("../../../infrastructure/common/supabase"));
const GET = async (req, rep) => {
    const { data, error } = await supabase_1.default
        .from("categories")
        .select("id, title, type, parent")
        .eq("parent", req.query.parentId);
    if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
        rep.status(404).send({ message: "No sub-categories found" });
        return;
    }
    if (error) {
        rep.status(500).send(error);
        return;
    }
    return { subCategories: data };
};
exports.GET = GET;
exports.GET.opts = {
    schema: {
        querystring: {
            type: "object",
            properties: {
                parentId: { type: "string" },
            },
        },
    },
};
