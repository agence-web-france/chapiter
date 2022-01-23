import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../libs/PrismaClient";

export const deleteSeo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      id: Joi.number().required()
    })
    const { query } = req
    if (typeof query.id === "string") {
      const value = { id: parseInt(query.id) }
      await schema.validateAsync(value)
      const seo = await prisma.seo.delete({
        where: value
      })
      return res.status(200).json({ seo });
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
};
