import { NowRequestHandler } from "fastify-now";
import { getSupabase } from "../../infrastructure/common/supabase";
import { Profile } from "../../types/profile";

type Get = NowRequestHandler<{
  Params: { id: string };
  Reply: { profile: Profile | null } | { message: string };
}>;

export const GET: Get = async (req, rep) => {
  if (!req.headers.authorization) {
    return rep.status(401).send({ message: "Unauthorized" });
  }

  const supabase = getSupabase(req.headers.authorization);

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

GET.opts = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
  },
};
