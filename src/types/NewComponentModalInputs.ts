import { ComponentStatus } from "./ComponentStatus";

export type NewComponentModalInputs = {
  name: string;
  description: string;
  status: ComponentStatus;
};