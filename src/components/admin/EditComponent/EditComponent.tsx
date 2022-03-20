import { PaperClipIcon, PlusIcon, XIcon } from "@heroicons/react/solid";
import { Component, Field } from "@prisma/client";
import { ChangeEventHandler, SyntheticEvent } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";

type EditComponentProps = {
  component: Component;
};

type Inputs = {
  name: string;
  description: string;
  fields: Field[];
};

const EditComponent = ({ component }: EditComponentProps) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "fields",
    }
  );
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Composant
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Modifier ou éditer les champs de votre composant.
              </p>
            </div>
            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Nom du composant
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    {...register("name")}
                    defaultValue={component.name}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description du composant
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    {...register("description")}
                    defaultValue={component.description}
                    rows={3}
                    name="description"
                    id="description"
                    autoComplete="given-description"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              {fields.map((field, index) => (
                <div
                  key={`field-container-${field.id}`}
                  className="border-t border-gray-200 pt-5 relative"
                >
                  <div className="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      title="Supprimer le champ"
                      type="button"
                      className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => remove(index)}
                    >
                      <span className="sr-only">Supprimer le champ</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start mb-4">
                    <label
                      htmlFor={`fields.${index}.name`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Nom du champ
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        key={field.id} // important to include key with field's id
                        {...register(`fields.${index}.name`)}
                        type="text"
                        name={`fields.${index}.name`}
                        id={`fields.${index}.name`}
                        autoComplete="given-name"
                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start mb-4">
                    <label
                      htmlFor={`fields.${index}.type`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Type du champ
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <select
                        key={field.id}
                        {...register(`fields.${index}.type`)}
                        name={`fields.${index}.type`}
                        id={`fields.${index}.type`}
                        autoComplete="given-name"
                        defaultValue={"text"}
                        className="lg:max-w-xs block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value={"text"}>Texte</option>
                        <option value={"image"}>Image</option>
                        <option value={"date"}>Date</option>
                        {/* <option value={"file"}>Fichier</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start mb-4">
                    <label
                      htmlFor={`fields.${index}.type`}
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Valeur du champ
                    </label>
                    {watch(`fields.${index}.type`) === "text" && (
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          key={field.id}
                          {...register(`fields.${index}.value`)}
                          name={`fields.${index}.value`}
                          id={`fields.${index}.value`}
                          type="text"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                    {watch(`fields.${index}.type`) === "image" && (
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <label htmlFor={`fields.${index}.value`} className="block cursor-pointer max-w-lg justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          {typeof watch(`fields.${index}.value`) ===
                          "object" ? (
                            <div className="flex justify-center">
                              <div className="relative">
                                <div className="max-h-40 mb-4 group flex items-center w-full aspect-square rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                  <img
                                    id={`fields-${index}-image--img`}
                                    src={
                                      typeof watch(`fields.${index}.value`) ===
                                      "object"
                                        ? URL.createObjectURL(
                                            watch(
                                              `fields.${index}.value`
                                            )[0] as unknown as
                                              | Blob
                                              | MediaSource
                                          )
                                        : ""
                                    }
                                    alt=""
                                    className="object-cover pointer-events-none group-hover:opacity-75"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          <div className="space-y-1 text-center">
                            <div className="flex text-sm justify-center text-gray-600">
                              <div
                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                              >
                                <span>Téléverser une image :</span>
                                <input
                                  data-img-preview-id={`fields-${index}-image--img`}
                                  data-field-value={`fields.${index}.value`}
                                  key={field.id}
                                  {...register(`fields.${index}.value`)}
                                  name={`fields.${index}.value`}
                                  id={`fields.${index}.value`}
                                  type="file"
                                  className="sr-only"
                                />
                              </div>
                              {/* <p className="pl-1">or drag and drop</p> */}
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF
                            </p>
                          </div>
                        </label>
                      </div>
                    )}
                    {watch(`fields.${index}.type`) === "date" && (
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <input
                          key={field.id}
                          {...register(`fields.${index}.value`)}
                          name={`fields.${index}.value`}
                          id={`fields.${index}.value`}
                          type="date"
                          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    )}
                    {/* {watch(`fields.${index}.type`) === "file" && (
                      <div className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                        <div className="w-0 flex-1 flex items-center">
                          <PaperClipIcon
                            className="flex-shrink-0 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="ml-2 flex-1 w-0 truncate">
                            resume_back_end_developer.pdf
                          </span>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex space-x-4">
                          <button
                            type="button"
                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Update
                          </button>
                          <span className="text-gray-300" aria-hidden="true">
                            |
                          </span>
                          <button
                            type="button"
                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => append({ type: "text" })}
            type="button"
            className="inline-flex items-center mb-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Ajouter un champ
          </button>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditComponent;
