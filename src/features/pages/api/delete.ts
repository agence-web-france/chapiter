import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "libs/PrismaClient";

export const deletePage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    const { query } = req;
    if (typeof query.id === "string") {
      const value = { id: parseInt(query.id) };
      await schema.validateAsync(value);
      const page = await prisma.page.delete({
        where: value,
      });
      return res.status(200).json({ page });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
