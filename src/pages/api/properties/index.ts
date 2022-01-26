import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "../../../features/commons/api/methodNotAllowed";
import { createProperty } from "../../../features/properties/api/create";
import { getProperties } from "../../../features/properties/api/read";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createProperty(req, res);
  }
  if (req.method === "GET") {
    return getProperties(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
