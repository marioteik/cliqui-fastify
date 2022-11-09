"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const supabase_1 = __importDefault(require("../../infrastructure/common/supabase"));
const GET = async (req, rep) => {
    var _a;
    const { data: rootCategory, error: errorRootCategory } = await supabase_1.default
        .from("categories")
        .select("id, title, type, parent")
        .is("parent", null)
        .single();
    if (errorRootCategory) {
        rep
            .status(errorRootCategory.code ? parseInt(errorRootCategory.code) : 500)
            .send(errorRootCategory);
        return;
    }
    const { data, error } = await supabase_1.default
        .from("categories")
        .select("id, title, type, parent")
        .eq("parent", rootCategory === null || rootCategory === void 0 ? void 0 : rootCategory.id);
    if (error) {
        rep.status(error.code ? parseInt(error.code) : 500).send(error);
        return;
    }
    return { categories: (_a = [rootCategory, ...data]) !== null && _a !== void 0 ? _a : [] };
};
exports.GET = GET;
exports.GET.opts = {};
