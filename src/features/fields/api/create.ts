import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const createField = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      componentId: Joi.number().required(),
    });
    const { body } = req;
    const value = {
      name: body.name,
      componentId: parseInt(body.componentId),
    };
    await schema.validateAsync(value);
    const field = await prisma.field.create({
      data: value,
    });
    return res.status(200).json({ field });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
