import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const getProperties = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const properties = await prisma.property.findMany();
    return res.status(200).json({ properties });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getProperty = async (
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
      const property = await prisma.property.findUnique({
        where: {
          id: parseInt(query.id),
        },
      });
      return res.status(200).json({ property });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
