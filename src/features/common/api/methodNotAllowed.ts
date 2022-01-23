import { NextApiResponse } from "next";

export const methodNotAllowed = (res: NextApiResponse) => {
  return res.status(405).end();
}