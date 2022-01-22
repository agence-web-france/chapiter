import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    title: string;
    description: string;
    pageId: string;
  };
}

export const createSeo = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req;
  if ("title" in body && "description" in body && "pageId" in body) {
    const seo = await prisma.seo.create({
      data: {
        title: body.title,
        description: body.description,
        pageId: parseInt(body.pageId),
      },
    });
    return res.status(200).json({ seo });
  }
  return res.status(500).end();
};
