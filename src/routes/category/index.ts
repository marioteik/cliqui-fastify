import { NowRequestHandler } from "fastify-now";
import supabase from "../../infrastructure/common/supabase";
import { Category } from "../../types/category";

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
    rep
      .status(errorRootCategory.code ? parseInt(errorRootCategory.code) : 500)
      .send(errorRootCategory);
    return;
  }

  const { data, error } = await supabase
    .from("categories")
    .select("id, title, type, parent")
    .eq("parent", rootCategory?.id);

  if (error) {
    rep.status(error.code ? parseInt(error.code) : 500).send(error);
    return;
  }

  return { categories: [rootCategory, ...(data as Category[])] ?? [] };
};

GET.opts = {};
