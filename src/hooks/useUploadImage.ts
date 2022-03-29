import { API } from "libs/API";

export const useUploadImage = () => {
  const uploadImage = async (file: FileList) => {
    try {
      const body = new FormData();
      body.append("file", file[0]);
      return await API.post<{ filename: string }>("/admin/upload", body, { headers: { 'content-type': 'multipart/form-data' } })
    } catch (error) {
      console.error(error)
    }
  };

  return { uploadImage };
};
