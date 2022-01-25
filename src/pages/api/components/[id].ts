import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "../../../features/common/api/methodNotAllowed";
import { deleteComponent } from "../../../features/component/api/delete";
import { getComponent } from "../../../features/component/api/read";
import { updateComponent } from "../../../features/component/api/update";

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
