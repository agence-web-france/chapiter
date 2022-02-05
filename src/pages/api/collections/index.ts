import { NextApiRequest, NextApiResponse } from "next";
import { createCollection } from "features/collections/api/create";
import { getCollections } from "features/collections/api/read";
import { methodNotAllowed } from "features/commons/api/methodNotAllowed";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createCollection(req, res);
  }
  if (req.method === "GET") {
    return getCollections(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
