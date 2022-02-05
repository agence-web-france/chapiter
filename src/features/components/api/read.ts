import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const getComponents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const components = await prisma.component.findMany();
    return res.status(200).json({ components });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const getComponent = async (
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
      const component = await prisma.component.findUnique({
        where: {
          id: parseInt(query.id),
        },
        include: {
          fields: true,
        },
      });
      return res.status(200).json({ component });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
