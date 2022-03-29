import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

const updateComponent = async (req: NextApiRequest, res: NextApiResponse) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    fields: Joi.array().items({
      type: Joi.string().valid("image", "date", "text").required(),
      name: Joi.string().required()
    })
  });
  console.log(req.body.fields)
  return res.status(200).json({ message: "develop" });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return updateComponent(req, res);
  }
};

export default handler;
