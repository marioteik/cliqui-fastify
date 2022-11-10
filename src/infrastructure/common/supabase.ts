import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON!;

const supabase = createClient(supabaseUrl, supabaseKey);

const getSupabase = (access_token: string) => {
  return createClient(supabaseUrl, supabaseKey, {
    global: {
      headers: {
        Authorization: access_token,
      },
    },
  });
};

export default supabase;
export { getSupabase };
