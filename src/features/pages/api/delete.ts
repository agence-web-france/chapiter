import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../libs/PrismaClient";

export const deletePage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  if ("id" in query && typeof query.id == "string") {
    const page = await prisma.page.delete({
      where: { id: parseInt(query.id) },
    });
    return res.status(200).json({ page });
  }
  return res.status(500).end();
};
