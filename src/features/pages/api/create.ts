import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const createPage = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { body } = req;
    await schema.validateAsync(body);
    const page = await prisma.page.create({
      data: {
        name: body.name,
      },
    });
    return res.status(200).json({ page });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
