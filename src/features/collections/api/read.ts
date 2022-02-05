import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const getCollections = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const collections = await prisma.collection.findMany();
    return res.status(200).json({ collections });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getCollection = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { query } = req;
    if (typeof query.id === "string") {
      const value = { id: parseInt(query.id) };
      await schema.validateAsync(value);
      const collection = await prisma.collection.findUnique({
        where: {
          id: parseInt(query.id),
        },
        include: {
          components: true,
        },
      });
      return res.status(200).json({ collection });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
