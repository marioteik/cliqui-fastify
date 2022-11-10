"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = void 0;
const supabase_1 = require("../../infrastructure/common/supabase");
const POST = async (req, rep) => {
    if (!req.headers.authorization) {
        return rep.status(401).send({ message: "Unauthorized" });
    }
    const supabase = (0, supabase_1.getSupabase)(req.headers.authorization);
    const { data: user, error: errorFindUser, status: statusFindUser, } = await supabase.from("profiles").select().eq("id", req.body.id);
    if (!user || (user && !user[0])) {
        const { data, error, status } = await supabase
            .from("profiles")
            .insert(Object.assign(Object.assign({}, req.body), { id: req.body.id }))
            .select()
            .single();
        if (error) {
            rep.status(status).send(error);
            return;
        }
        return { profile: data };
    }
    else {
        const { data, error, status } = await supabase
            .from("profiles")
            .update(Object.assign(Object.assign({}, req.body), { updated_at: new Date() }))
            .eq("id", req.body.id)
            .select()
            .single();
        if (error) {
            rep.status(status).send(error);
            return;
        }
        return { profile: data };
    }
};
exports.POST = POST;
exports.POST.opts = {
    schema: {
        headers: {
            type: "object",
            properties: {
                authorization: { type: "string" },
            },
        },
        body: {
            type: "object",
            properties: {
                id: { type: "string" },
                full_name: { type: "string" },
                avatar_url: { type: "string" },
                website: { type: "string" },
            },
        },
        response: {
            200: {
                type: "object",
                properties: {
                    profile: {
                        type: "object",
                        properties: {
                            id: { type: "string" },
                            full_name: { type: "string" },
                            avatar_url: { type: "string" },
                            website: { type: "string" },
                        },
                    },
                },
            },
        },
    },
};
