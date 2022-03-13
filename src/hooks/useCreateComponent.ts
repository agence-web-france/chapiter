import { API } from "libs/API";
import { NewComponentModalInputs } from "types/NewComponentModalInputs";

export const useCreateComponent = () => {
  const createComponent = async (data: NewComponentModalInputs) => {
    try {
      await API.post("/admin/component", { ...data });
    } catch (error) {
      console.error(error);
    }
  };

  return { createComponent };
};
