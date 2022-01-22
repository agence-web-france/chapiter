import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../libs/PrismaClient";

export const deleteSeo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  if ("id" in query && typeof query.id == "string") {
    const seo = await prisma.seo.delete({
      where: { id: parseInt(query.id) },
    });
    return res.status(200).json({ seo });
  }
  return res.status(500).end();
};
