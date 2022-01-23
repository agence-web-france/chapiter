import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const getPages = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const pages = await prisma.page.findMany();
    return res.status(200).json({ pages });
  } catch (error) {
    return res.status(400).json({ error })
  }
};

export const getPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required()
    })
    const { query } = req;
    if (typeof query.id === "string") {
      const value = { id: parseInt(query.id) }
      await schema.validateAsync(value)
      const page = await prisma.page.findUnique({
        where: {
          id: parseInt(query.id),
        },
        include: {
          seo: true,
        },
      });
      return res.status(200).json({ page });
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
};
