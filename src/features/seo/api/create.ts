import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const createSeo = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      pageId: Joi.number().required()
    })
    const { body } = req;
    const value = {
      title: body.title,
      description: body.description,
      pageId: parseInt(body.pageId),
    }
    await schema.validateAsync(value)
    const seo = await prisma.seo.create({
      data: value,
    });
    return res.status(200).json({ seo });
  } catch (error) {
    return res.status(400).json({ error })
  }
};
