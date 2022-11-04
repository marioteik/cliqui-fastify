import { NowRequestHandler } from "fastify-now";
import supabase from "../../infrastructure/common/supabase";

type Get = NowRequestHandler<{
  Reply: { categories: Category[]; count: number } | { message: string };
}>;

export const GET: Get = async (req, rep) => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, title, type");

  if (error) {
    rep.status(500).send(error);
  }

  return { categories: data ?? [] };
};

GET.opts = {};
