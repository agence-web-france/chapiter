import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export const updatePage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  if ("id" in query && typeof query.id === "string" && "name" in body) {
    const page = await prisma.page.update({
      where: { id: parseInt(query.id) },
      data: {
        name: body.name,
      },
    });
    return res.status(200).json({ page });
  }
  return res.status(500).end();
};
