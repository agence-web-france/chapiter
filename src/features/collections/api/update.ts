import { prisma } from "libs/PrismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";

export const updateCollection = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const schema = {
      query: Joi.object({
        id: Joi.number().required(),
      }),
      body: Joi.object({
        name: Joi.string().required(),
      }),
    };
    const { query, body } = req;
    if (typeof query.id === "string") {
      const value = {
        query: { id: parseInt(query.id) },
        body: body,
      };
      await schema.query.validateAsync(value.query);
      await schema.body.validateAsync(value.body);
      const collection = await prisma.collection.update({
        where: { id: parseInt(query.id) },
        data: {
          name: body.name,
        },
      });
      return res.status(200).json({ collection });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
