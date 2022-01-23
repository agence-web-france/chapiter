import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "../../../features/common/api/methodNotAllowed";
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
  return methodNotAllowed(res);
};

export default handler;
