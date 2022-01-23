import { prisma } from "../../../libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const updateSeo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = {
      query: Joi.object({
        id: Joi.number().required()
      }),
      body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required()
      })
    }
    const { query, body } = req;
    if (typeof query.id === "string") {
      const value = {
        query: { id: parseInt(query.id) },
        body: body
      }
      await schema.query.validateAsync(value.query)
      await schema.body.validateAsync(value.body)
      const seo = await prisma.seo.update({
        where: { id: parseInt(query.id) },
        data: {
          title: body.title,
          description: body.description
        },
      });
      return res.status(200).json({ seo });
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
};