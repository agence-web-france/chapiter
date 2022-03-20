/* This example requires Tailwind CSS v2.0+ */
import { Dispatch, Fragment, SetStateAction, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import InputWithError from "components/admin/InputWithError/InputWithError";
import { NewComponentModalInputs } from "types/NewComponentModalInputs";
import { useCreateComponent } from "hooks/useCreateComponent";

type NewComponentModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function NewComponentModal({
  open,
  setOpen,
}: NewComponentModalProps) {
  const { createComponent } = useCreateComponent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewComponentModalInputs>();
  const onSubmit: SubmitHandler<NewComponentModalInputs> = (data) => {
    createComponent(data);
    setOpen(false);
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 16px)" }}
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen p-4 text-center sm:block sm:p-0">
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
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PlusIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Créer un nouveau composant
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Créer un nouveau composant afin de gérer le contenu de
                        votre site web.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <InputWithError error={errors.name}>
                    <label htmlFor="name" className="input-text--label">
                      Nom
                    </label>
                    <input
                      {...register("name", {
                        required: "Le nom est requis.",
                      })}
                      type="text"
                      name="name"
                      id="name"
                      className="input-text"
                      placeholder=""
                    />
                  </InputWithError>
                  <InputWithError error={errors.description}>
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
                      rows={5}
                    />
                  </InputWithError>
                  <InputWithError error={errors.status}>
                    <label htmlFor="status" className="select-native--label">
                      Statut
                    </label>
                    <select
                      {...register("status", {
                        required: "Choisissez un statut",
                      })}
                      name="status"
                      id="status"
                      className="select-native"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </InputWithError>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Créer
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Annuler
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
