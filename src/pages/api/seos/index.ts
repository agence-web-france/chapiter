import { NextApiRequest, NextApiResponse } from "next";
import { getPages } from "../../../features/pages/api/read";
import { createSeo } from "../../../features/seo/api/create";
import { getSeos } from "../../../features/seo/api/read";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createSeo(req, res);
  }
  if (req.method === "GET") {
    return getSeos(req, res);
  }
};

export default handler;
