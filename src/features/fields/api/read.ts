import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const getFields = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const fields = await prisma.field.findMany();
    return res.status(200).json({ fields });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getField = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { query } = req;
    if (typeof query.id === "string") {
      const value = { id: parseInt(query.id) };
      await schema.validateAsync(value);
      const field = await prisma.field.findUnique({
        where: {
          id: parseInt(query.id),
        },
        include: {
          properties: true,
        },
      });
      return res.status(200).json({ field });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
