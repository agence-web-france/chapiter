import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const createProperty = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      fieldId: Joi.number().required(),
      type: Joi.string().required(),
      value: Joi.string().required(),
    });
    const { body } = req;
    const value = {
      name: body.name,
      fieldId: parseInt(body.fieldId),
      type: body.type,
      value: body.value,
    };
    await schema.validateAsync(value);
    const property = await prisma.property.create({
      data: value,
    });
    return res.status(200).json({ property });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
