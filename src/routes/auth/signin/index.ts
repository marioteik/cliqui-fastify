import { NowRequestHandler } from "fastify-now";
import { Session, User } from "@supabase/supabase-js";
import supabase from "../../../infrastructure/common/supabase";

type Post = NowRequestHandler<{
  Body: { phone: string; password: string };
  Reply: { message: string } | { user: User | null; session: Session | null };
}>;

export const POST: Post = async (req, rep) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    phone: req.body?.phone,
    password: req.body?.password,
  });

  if (error) {
    rep.status(500).send(error);
  }

  return { user: data.user, session: data.session };
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
