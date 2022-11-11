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

type Put = NowRequestHandler<{
  Headers: { authorization: string };
  Params: { id: string };
  Body: { id: string; full_name: string; avatar_url: string; website: string };
  Reply: { profile: Profile } | { message: string };
}>;

export const PUT: Put = async (req, rep) => {
  if (!req.headers.authorization) {
    return rep.status(401).send({ message: "Unauthorized" });
  }

  const supabase = getSupabase(req.headers.authorization);

  const {
    data: user,
    error: errorFindUser,
    status: statusFindUser,
  } = await supabase.from("profiles").select().eq("id", req.params.id);

  if (!user || (user && !user[0])) {
    const { data, error, status } = await supabase
      .from("profiles")
      .insert({ ...req.body, id: req.params.id })
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
      .eq("id", req.params.id)
      .select()
      .single();

    if (error) {
      rep.status(status).send(error);
      return;
    }

    return { profile: data };
  }
};

PUT.opts = {
  schema: {
    params: {
      type: "object",
      properties: {
        id: { type: "string" },
      },
    },
    headers: {
      type: "object",
      properties: {
        authorization: { type: "string" },
      },
    },
    body: {
      type: "object",
      properties: {
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
