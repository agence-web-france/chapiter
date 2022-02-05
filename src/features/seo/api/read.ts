import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const getSeos = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const seos = await prisma.seo.findMany();
    return res.status(200).json({ seos });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getSeo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { query } = req;
    if (typeof query.id === "string") {
      const value = { id: parseInt(query.id) };
      await schema.validateAsync(value);
      const seo = await prisma.seo.findUnique({
        where: {
          id: parseInt(query.id),
        },
      });
      return res.status(200).json({ seo });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
