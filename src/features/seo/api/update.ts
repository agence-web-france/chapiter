import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export const updateSeo = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, body } = req;
  if (
    "id" in query &&
    typeof query.id === "string" &&
    "title" in body &&
    "description" in body
  ) {
    const seo = await prisma.seo.update({
      where: { id: parseInt(query.id) },
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return res.status(200).json({ seo });
  }
  return res.status(500).end();
};
