import InputText from "components/form/inputs/text";
import ButtonSubmit from "components/form/buttons/submit";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { API } from "libs/API";
import FieldForm from "features/fields/components/field";

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

function CreateForm({ open, setOpen, collection }: CreateProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "fields", // unique name for your Field Array
    }
  );

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    try {
      await API.post("/components", { ...data });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const maxModalHeight = window.innerHeight * (50 / 100);

  useEffect(() => {
    setValue("collectionId", collection.id);
  }, []);

  return (
    <>
      <section className="lg:px-6 lg:py-5 p-4 rounded bg-white card">
        <h2 className="text-2xl font-semibold mb-4 px-2">
          Créer un nouvel élément
        </h2>
        <p className="leading-5 pb-4 px-2">
          Créer une nouvel élément afin de lui insérer des champs pour gérer son
          contenu.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="overflow-y-auto px-2"
          style={{
            maxHeight:
              window.innerWidth < 768
                ? `${window.innerHeight * (50 / 100)}px`
                : `${window.innerHeight * (66 / 100)}px`,
          }}
        >
          <InputText error={errors.collectionId}>
            <>
              <label
                htmlFor="collectionId"
                className="input-text--label disabled"
              >
                {collection.name}
              </label>
              <input
                {...register("collectionId")}
                type="text"
                name="collectionId"
                id="collectionId"
                className="hidden"
                placeholder=""
                value={collection.id}
                disabled={true}
              />
            </>
          </InputText>
          <InputText error={errors.name}>
            <>
              <label htmlFor="name" className="input-text--label">
                Nom de l'élément
              </label>
              <input
                {...register("name", { required: "Le nom est requis." })}
                type="text"
                name="name"
                id="name"
                className="input-text"
                placeholder=""
              />
            </>
          </InputText>
          <div>
            {fields.map((field, index) => (
              <div key={`field-key-${field.id}`}>
                <FieldForm
                  {...{ field, index, register, setValue, control, getValues }}
                />
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => append({})}
              type="button"
              className="inline-flex items-center mb-4 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Ajouter un champ
            </button>
          </div>
          <div className="flex items-center justify-end py-2">
            <button
              type="button"
              className="mr-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
            <ButtonSubmit>
              <>Créer l'élément</>
            </ButtonSubmit>
          </div>
        </form>
      </section>
      <hr className="lg:hidden" />
    </>
  );
}

type CreateProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  collection: Collection;
};

import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, PlusIcon } from "@heroicons/react/outline";
import { Collection, Field, Property } from "@prisma/client";

export default function Create({ open, setOpen, collection }: CreateProps) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg lg:px-4 lg:pt-5 lg:pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full sm:p-6">
              <CreateForm {...{ open, setOpen, collection }} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
