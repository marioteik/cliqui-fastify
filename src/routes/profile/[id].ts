import { NowRequestHandler } from "fastify-now";
import supabase from "../../infrastructure/common/supabase";
import { Profile } from "../../types/profile";

type Get = NowRequestHandler<{
  Params: { id: string };
  Reply: { profile: Profile } | { message: string };
}>;

export const GET: Get = async (req, rep) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url, website")
    .is("id", req.params.id)
    .single();

  if (!data) {
    rep.status(404).send({ message: error?.message });
    return;
  }

  if (error) {
    rep.status(404).send(error);
    return;
  }

  return { profile: data };
};

GET.opts = {};
