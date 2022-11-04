import { NowRequestHandler } from "fastify-now";
import supabase from "../../../infrastructure/common/supabase";

type Get = NowRequestHandler<{
  Reply: { message: string };
}>;

export const GET: Get = async (req, rep) => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    rep.status(500).send(error);
  }

  rep.status(200).send({ message: "Logged out" });
};

GET.opts = {};
