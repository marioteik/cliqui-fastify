import { NowRequestHandler } from "fastify-now";
import supabase from "../../../infrastructure/common/supabase";

type Get = NowRequestHandler<{
  Querystring: { parentId: string };
  Reply: { subCategories: Category[] } | { message: string };
}>;

export const GET: Get = async (req, rep) => {
  const { data, error } = await supabase
    .from("categories")
    .select("id, title, type, parent")
    .eq("parent", req.query.parentId);

  if (data?.length === 0) {
    rep.status(404).send({ message: "No sub-categories found" });
    return;
  }

  if (error) {
    rep.status(500).send(error);
    return;
  }

  return { subCategories: data };
};

GET.opts = {
  schema: {
    querystring: {
      type: "object",
      properties: {
        parentId: { type: "string" },
      },
    },
  },
};
