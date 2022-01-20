import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export const getPages = async (req: NextApiRequest, res: NextApiResponse) => {
  const pages = await prisma.page.findMany();
  return res.status(200).json({ pages });
};

export const getPage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  if ("id" in query && typeof query.id === "string") {
    const page = await prisma.page.findUnique({
      where: {
        id: parseInt(query.id),
      },
    });
    return res.status(200).json({ page });
  }
};
