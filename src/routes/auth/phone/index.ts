import { NowRequestHandler } from "fastify-now";
import { User } from "@supabase/supabase-js";
import supabase from "../../../infrastructure/common/supabase";

type Post = NowRequestHandler<{
  Body: { phone: string };
  Reply: { message: string } | { user: User | null };
}>;

export const POST: Post = async (req, rep) => {
  const { data, error } = await supabase.auth.signInWithOtp({
    phone: req.body?.phone,
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
      },
      required: ["phone"],
    },
  },
};
