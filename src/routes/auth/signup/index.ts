import { NowRequestHandler } from "fastify-now";
import { User } from "@supabase/supabase-js";
import supabase from "../../../infrastructure/common/supabase";

type Post = NowRequestHandler<{
  Body: { phone: string; password: string };
  Reply: { message: string } | { user: User | null };
}>;

export const POST: Post = async (req, rep) => {
  console.log("req.body", req.body);

  const { data, error } = await supabase.auth.signUp({
    phone: req.body?.phone,
    password: req.body?.password,
  });

  if (error) {
    rep.status(500).send(error);
  }

  return { user: data.user };
};

POST.opts = {
  schema: {
    body: {
      type: "object",
      properties: {
        phone: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
      required: ["phone", "password"],
    },
  },
};
