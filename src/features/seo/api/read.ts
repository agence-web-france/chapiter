import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export const getSeos = async (req: NextApiRequest, res: NextApiResponse) => {
  const seos = await prisma.seo.findMany();
  return res.status(200).json({ seos });
};

export const getSeo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  if ("id" in query && typeof query.id === "string") {
    const seo = await prisma.seo.findUnique({
      where: {
        id: parseInt(query.id),
      },
    });
    return res.status(200).json({ seo });
  }
};
