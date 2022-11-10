"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON;
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const getSupabase = (access_token) => {
    return (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey, {
        global: {
            headers: {
                Authorization: access_token,
            },
        },
    });
};
exports.getSupabase = getSupabase;
exports.default = supabase;
