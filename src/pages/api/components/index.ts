import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "../../../features/commons/api/methodNotAllowed";
import { createComponent } from "../../../features/components/api/create";
import { getComponents } from "../../../features/components/api/read";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createComponent(req, res);
  }
  if (req.method === "GET") {
    return getComponents(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
