import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "features/commons/api/methodNotAllowed";
import { deleteComponent } from "features/components/api/delete";
import { getComponent } from "features/components/api/read";
import { updateComponent } from "features/components/api/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deleteComponent(req, res);
  }
  if (req.method === "PATCH") {
    return updateComponent(req, res);
  }
  if (req.method === "GET") {
    return getComponent(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
