import { NextApiRequest, NextApiResponse } from "next";
import { methodNotAllowed } from "features/commons/api/methodNotAllowed";
import { deleteField } from "features/fields/api/delete";
import { getField } from "features/fields/api/read";
import { updateField } from "features/fields/api/update";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    return deleteField(req, res);
  }
  if (req.method === "PATCH") {
    return updateField(req, res);
  }
  if (req.method === "GET") {
    return getField(req, res);
  }
  return methodNotAllowed(res);
};

export default handler;
