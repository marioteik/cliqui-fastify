import { NowRequestHandler } from "fastify-now";
import supabase from "../../../infrastructure/common/supabase";
import { Session, User } from "@supabase/supabase-js";

type Post = NowRequestHandler<{
  Body: { phone: string; token: string };
  Reply: { message: string } | { user: User | null; session: Session | null };
}>;

export const POST: Post = async (req, rep) => {
  const {
    data: { session, user },
    error,
  } = await supabase.auth.verifyOtp({
    type: "sms",
    phone: req.body.phone,
    token: req.body.token,
  });

  if (error) {
    rep.status(500).send(error);
  }

  rep.status(200).send({ session: session!, user: user! });
};

POST.opts = {
  schema: {
    body: {
      type: "object",
      properties: {
        phone: {
          type: "string",
        },
        token: {
          type: "string",
        },
      },
      required: ["phone", "token"],
    },
  },
};
