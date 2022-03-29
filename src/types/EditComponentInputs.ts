import { Field } from "@prisma/client";

export type EditComponentInputs = {
  id: number;
  name: string;
  description: string;
  fields: Field[];
};