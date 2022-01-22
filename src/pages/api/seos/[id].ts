import { NextApiRequest, NextApiResponse } from "next";
import { deleteSeo } from "../../../features/seo/api/delete";
import { getSeo } from "../../../features/seo/api/read";
import { updateSeo } from "../../../features/seo/api/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deleteSeo(req, res);
  }
  if (req.method === "PATCH") {
    return updateSeo(req, res);
  }
  if (req.method === "GET") {
    return getSeo(req, res);
  }
};

export default handler;
