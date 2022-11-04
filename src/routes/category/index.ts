import { NowRequestHandler } from "fastify-now";
import supabase from "../../infrastructure/common/supabase";

type Get = NowRequestHandler<{
  Reply: { categories: Category[] } | { message: string };
}>;

export const GET: Get = async (req, rep) => {
  const { data: rootCategory, error: errorRootCategory } = await supabase
    .from("categories")
    .select("id, title, type, parent")
    .is("parent", null)
    .single();

  if (errorRootCategory) {
    rep.status(500).send({ message: "No categories found" });
    return;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, title, type, parent")
    .eq("parent", rootCategory?.id);

  if (error) {
    rep.status(500).send(error);
  }

  return { categories: [rootCategory, ...(data as Category[])] ?? [] };
};

GET.opts = {};
