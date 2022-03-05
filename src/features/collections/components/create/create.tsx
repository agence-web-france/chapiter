import InputText from "components/form/inputs/text";
import ButtonSubmit from "components/form/buttons/submit";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "libs/API";

type Inputs = {
  name: string;
  description: string;
};

function CreateForm({ open, setOpen }: CreateProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await API.post("/collections", { ...data });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <section className="p-6 lg:m-6 rounded bg-white card">
        <h2 className="text-2xl font-semibold mb-4">
          Créer une nouvelle collection
        </h2>
        <p>
          Créer une nouvelle collection afin de gérer les contenus qui se répète
          sur votre site web.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText error={errors.name}>
            <>
              <label htmlFor="name" className="input-text--label">
                Nom
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
          <InputText error={errors.description}>
            <>
              <label htmlFor="description" className="input-text--label">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "La description est requise.",
                })}
                name="description"
                id="description"
                className="input-text"
                placeholder=""
                rows={5}
                cols={33}
              />
            </>
          </InputText>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="mr-4 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:mt-0 sm:col-start-1 sm:text-sm"
              onClick={() => setOpen(false)}
            >
              Annuler
            </button>
            <ButtonSubmit>
              <>Créer la collection</>
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
};

import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

export default function Create({ open, setOpen }: CreateProps) {
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
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <CreateForm {...{ open, setOpen }} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
