import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "../../../features/common/api/methodNotAllowed";
import { deletePage } from "../../../features/pages/api/delete";
import { getPage } from "../../../features/pages/api/read";
import { updatePage } from "../../../features/pages/api/update";
import { deleteProperty } from "../../../features/properties/api/delete";
import { getProperty } from "../../../features/properties/api/read";
import { updateProperty } from "../../../features/properties/api/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deleteProperty(req, res);
  }
  if (req.method === "PATCH") {
    return updateProperty(req, res);
  }
  if (req.method === "GET") {
    return getProperty(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
