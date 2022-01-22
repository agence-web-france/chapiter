import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";

export interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    name: string;
  };
}

export const createPage = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req;
  if ("name" in body) {
    const page = await prisma.page.create({
      data: {
        name: body.name,
      },
    });
    return res.status(200).json({ page });
  }
  return res.status(500).end();
};
