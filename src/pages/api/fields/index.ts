import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "../../../features/common/api/methodNotAllowed";
import { createField } from "../../../features/fields/api/create";
import { getFields } from "../../../features/fields/api/read";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createField(req, res);
  }
  if (req.method === "GET") {
    return getFields(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
