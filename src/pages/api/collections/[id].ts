import { NextApiRequest, NextApiResponse } from "next";
import { deleteCollection } from "../../../features/collections/api/delete";
import { getCollection } from "../../../features/collections/api/read";
import { updateCollection } from "../../../features/collections/api/update";
import { methodNotAllowed } from "../../../features/commons/api/methodNotAllowed";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deleteCollection(req, res);
  }
  if (req.method === "PATCH") {
    return updateCollection(req, res);
  }
  if (req.method === "GET") {
    return getCollection(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
