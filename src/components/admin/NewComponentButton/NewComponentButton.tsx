import { PlusIcon } from "@heroicons/react/solid";
import NewComponentModal from "components/admin/NewComponentModal/NewComponentModal";
import { useState } from "react";

export default function NewComponentButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Créer un nouveau composant
      </button>
      <NewComponentModal open={open} setOpen={setOpen} />
    </>
  );
}
