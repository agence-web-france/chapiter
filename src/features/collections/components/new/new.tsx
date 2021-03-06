import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { API } from "libs/API";
import { CollectionContext } from "features/collections/context/collection";

type Inputs = {
  name: string;
  description: string;
};

export default function New() {
  const { register, handleSubmit } = useForm<Inputs>();

  const collection = useContext(CollectionContext);
  const { showNewModal, setShowNewModal } = collection.modal.new;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await API.post("/collections", { ...data });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Transition.Root show={showNewModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setShowNewModal}
      >
        <div className="absolute inset-0 overflow-hidden bg-opacity-50 bg-black">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 pl-16 max-w-full right-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="h-full divide-y divide-gray-200 flex flex-col bg-white shadow-xl"
                >
                  <div className="flex-1 h-0 overflow-y-auto">
                    <div className="py-6 px-4 bg-indigo-700 sm:px-6">
                      <div className="flex items-center justify-between">
                        <Dialog.Title className="text-lg font-medium text-white">
                          Cr??er une collection
                        </Dialog.Title>
                        <div className="ml-3 h-7 flex items-center">
                          <button
                            type="button"
                            className="bg-indigo-700 rounded-md text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setShowNewModal(false)}
                          >
                            <span className="sr-only">Fermer l'onglet</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-sm text-indigo-300">
                          Cr??er une nouvelle collection afin de g??rer les
                          contenus qui se r??p??te sur votre site web.
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="px-4 divide-y divide-gray-200 sm:px-6">
                        <div className="space-y-6 pt-6 pb-5">
                          <div>
                            <label
                              htmlFor="project-name"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Nom de la collection
                            </label>
                            <div className="mt-1">
                              <input
                                {...register("name", { required: true })}
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md border px-1"
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <textarea
                                {...register("description", { required: true })}
                                rows={4}
                                className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border border-gray-300 rounded-md px-1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 pb-6">
                          <div className="flex text-sm">
                            <a
                              href="#"
                              className="group inline-flex items-center text-gray-500 hover:text-gray-900"
                            >
                              <QuestionMarkCircleIcon
                                className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              <span className="ml-2">
                                En savoir plus sur les collections
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 px-4 py-4 flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setShowNewModal(false)}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cr??er
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
