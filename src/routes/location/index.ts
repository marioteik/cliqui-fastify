import { NowRequestHandler } from "fastify-now";
import { Profile } from "../../types/profile";
import { getSupabase } from "../../infrastructure/common/supabase";

type Post = NowRequestHandler<{
  Headers: { authorization: string };
  Body: { id: string; full_name: string; avatar_url: string; website: string };
  Reply: { profile: Profile } | { message: string };
}>;

export const POST: Post = async (req, rep) => {
  if (!req.headers.authorization) {
    return rep.status(401).send({ message: "Unauthorized" });
  }

  const supabase = getSupabase(req.headers.authorization);

  const {
    data: user,
    error: errorFindUser,
    status: statusFindUser,
  } = await supabase.from("profiles").select().eq("id", req.body.id);

  if (!user || (user && !user[0])) {
    const { data, error, status } = await supabase
      .from("profiles")
      .insert({ ...req.body, id: req.body.id })
      .select()
      .single();

    if (error) {
      rep.status(status).send(error);
      return;
    }

    return { profile: data };
  } else {
    const { data, error, status } = await supabase
      .from("profiles")
      .update({ ...req.body, updated_at: new Date() })
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

POST.opts = {
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
