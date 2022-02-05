import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "libs/PrismaClient";

export const deleteField = async (
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
      const field = await prisma.field.delete({
        where: value,
      });
      return res.status(200).json({ field });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
