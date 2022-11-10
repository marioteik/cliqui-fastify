"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
const supabase_1 = require("../../infrastructure/common/supabase");
const GET = async (req, rep) => {
    if (!req.headers.authorization) {
        return rep.status(401).send({ message: "Unauthorized" });
    }
    const supabase = (0, supabase_1.getSupabase)(req.headers.authorization);
    const { data, error, status } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_url, website")
        .eq("id", req.params.id);
    if (error) {
        rep.status(status).send(error);
        return;
    }
    if (data && !data[0]) {
        return { profile: null };
    }
    return { profile: data[0] };
};
exports.GET = GET;
exports.GET.opts = {
    schema: {
        params: {
            type: "object",
            properties: {
                id: { type: "string" },
            },
        },
    },
};
