import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "libs/PrismaClient";
import Joi from "joi";

const createComponent = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().valid("draft", "published"),
    });

    const { body } = req;

    const value = {
      name: body.name,
      description: body.description,
      status: body.status,
    };

    await schema.validateAsync(value);

    const component = await prisma.component.create({
      data: value,
    });

    return res.status(200).json({ component });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return createComponent(req, res);
  }
};

export default handler;
