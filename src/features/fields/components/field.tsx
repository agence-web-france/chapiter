import { PlusIcon } from "@heroicons/react/solid";
import { Field, Property } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

type PropertyWithTypes = Property & {
  type: "Texte" | "Image" | "Date";
};

type FieldWithProperties = Field & {
  properties: PropertyWithTypes[];
};

type Inputs = {
  name: string;
  collectionId: number;
  fields: FieldWithProperties[];
};

type FieldFormProps = {
  field: Field;
  index: number;
  register: UseFormRegister<Inputs>;
  setValue: UseFormSetValue<Inputs>;
  control: Control<Inputs, any>;
  getValues: UseFormGetValues<Inputs>;
};

type ValueInputProps = {
  index: number;
  nestIndex: number;
  register: UseFormRegister<Inputs>;
  getValues: UseFormGetValues<Inputs>;
  control: Control<Inputs, any>;
};

const ValueInput = ({
  index,
  nestIndex,
  register,
  getValues,
  control,
}: ValueInputProps) => {
  const type = useWatch({
    control,
    name: `fields.${index}.properties.${nestIndex}.type`,
  });

  console.log(type);

  if (type === "Texte") {
    return (
      <div className="mb-4">
        <label
          htmlFor={`fields.${index}.properties.${nestIndex}.value`}
          className="input-text--label"
        >
          Valeur du texte
        </label>
        <input
          id={`fields.${index}.properties.${nestIndex}.value`}
          {...register(`fields.${index}.properties.${nestIndex}.value`)}
          className="input-text"
        />
      </div>
    );
  }

  return <></>;
};

export default function FieldForm({
  field,
  index,
  register,
  setValue,
  getValues,
  control,
}: FieldFormProps) {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: `fields.${index}.properties`,
    }
  );

  useEffect(() => {
    setValue(`fields.${index}.name`, `Champ n°${index}`);
  }, []);

  return (
    <>
      <div
        key={field.id}
        className="border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-teal-600 focus-within:border-teal-600 my-4"
      >
        {/* Nom du champ */}
        <div className="mb-4">
          <label htmlFor={`fields.${index}.id`} className="input-text--label">
            Nom du champ
          </label>
          <input
            id={`fields.${index}.id`}
            className="input-text"
            key={field.id}
            {...register(`fields.${index}.name`)}
          />
        </div>
        {/* Toutes les propriétés */}
        {fields.map((field, nestIndex) => (
          <div key={field.id} className="my-4 border p-4">
            {/* Nom de la propriété */}
            <div className="mb-2">
              <label
                htmlFor={`fields.${index}.properties.${nestIndex}.name`}
                className="input-text--label"
              >
                Nom de la propriété
              </label>
              <input
                id={`fields.${index}.properties.${nestIndex}.name`}
                className="input-text"
                // key={field.id}
                {...register(`fields.${index}.properties.${nestIndex}.name`)}
              />
            </div>
            {/* Type de la propriété */}
            <div className="mb-2">
              <label
                htmlFor={`fields.${index}.properties.${nestIndex}.type`}
                className="block font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id={`fields.${index}.properties.${nestIndex}.type`}
                {...register(`fields.${index}.properties.${nestIndex}.type`)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border"
                defaultValue="Texte"
              >
                <option>Texte</option>
                {/* <option>Image</option>
                <option>Date</option> */}
              </select>
            </div>
            {/* Valeur de la propriété */}
            <ValueInput
              {...{ index, nestIndex, register, getValues, control }}
            />
          </div>
        ))}
        <div>
          <button
            onClick={() => append({})}
            type="button"
            className="inline-flex items-center mb-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Ajouter une propriété
          </button>
        </div>
      </div>
    </>
  );
}
