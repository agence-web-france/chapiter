import { NextApiRequest, NextApiResponse } from "next";
import { deletePage } from "../../../features/pages/api/delete";
import { getPage } from "../../../features/pages/api/read";
import { updatePage } from "../../../features/pages/api/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deletePage(req, res);
  }
  if (req.method === "PATCH") {
    return updatePage(req, res);
  }
  if (req.method === "GET") {
    return getPage(req, res);
  }
};

export default handler;
