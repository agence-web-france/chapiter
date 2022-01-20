import { NextApiRequest, NextApiResponse } from "next";
import { deletePage } from "../../../features/pages/api/delete";
import { updatePage } from "../../../features/pages/api/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deletePage(req, res);
  }
  if (req.method === "PATCH") {
    return updatePage(req, res);
  }
};

export default handler;
