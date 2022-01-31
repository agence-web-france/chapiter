import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const createCollection = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
    });
    const { body } = req;
    const value = {
      name: body.name,
      description: body.description,
    };
    await schema.validateAsync(value);
    const collection = await prisma.collection.create({
      data: value,
    });
    return res.status(200).json({ collection });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
