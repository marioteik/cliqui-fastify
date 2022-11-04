import { NowRequestHandler } from "fastify-now";
import { User } from "@supabase/supabase-js";
import supabase from "../../../infrastructure/common/supabase";

type Get = NowRequestHandler<{
  Body: { phone: string };
  Reply: { message: string } | { user: User | null };
}>;

export const GET: Get = async (req, rep) => {
  const [_, token] = req.headers.authorization?.split(" ") ?? [];

  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    rep.status(401).send(error);
  }

  return { user: data.user };
};

GET.opts = {
  schema: {
    headers: {
      type: "object",
      properties: {
        authorization: {
          type: "string",
        },
      },
      required: ["authorization"],
    },
  },
};
