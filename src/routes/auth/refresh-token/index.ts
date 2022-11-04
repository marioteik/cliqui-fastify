import { NowRequestHandler } from "fastify-now";
import supabase from "../../../infrastructure/common/supabase";
import { Session, User } from "@supabase/supabase-js";

type Post = NowRequestHandler<{
  Body: { refreshToken: string };
  Reply: { message: string } | { user: User | null; session: Session | null };
}>;

export const POST: Post = async (req, rep) => {
  const {
    data: { session, user },
    error,
  } = await supabase.auth.refreshSession({
    refresh_token: req.body.refreshToken,
  });

  if (error) {
    rep.status(401).send(error);
  }

  rep.status(200).send({ session: session!, user: user! });
};

POST.opts = {
  schema: {
    body: {
      type: "object",
      properties: {
        refreshToken: {
          type: "string",
        },
      },
      required: ["refreshToken"],
    },
  },
};
