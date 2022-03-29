import { API } from "libs/API";
import { EditComponentInputs } from "types/EditComponentInputs";
import { useUploadImage } from "./useUploadImage";


export const useEditComponent = () => {

  const { uploadImage } = useUploadImage()

  const editComponent = async (data: EditComponentInputs) => {
    try {
      data.fields.map(async field => {
        if (field.type === "image") {
          const uploadRequest = await uploadImage(field.value as unknown as FileList)
          if (uploadRequest) {
            field.value = uploadRequest.data.filename
          }
          else {
            throw new Error("Error during upload");
          }
        }
      })

      await API.post(`/admin/component/${data.id}`, { ...data });
    } catch (error) {
      console.error(error);
    }
  };

  return { editComponent };
};
