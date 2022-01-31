import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "features/commons/api/methodNotAllowed";
import { createPage } from "features/pages/api/create";
import { getPages } from "features/pages/api/read";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createPage(req, res);
  }
  if (req.method === "GET") {
    return getPages(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
