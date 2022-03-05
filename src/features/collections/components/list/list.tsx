import { Collection } from "@prisma/client";
import cx from "classnames";
import { PlusIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useState } from "react";
import ModalNoSSR from "components/modal/modal";
import Create from "features/collections/components/create/create";

type ListProps = {
  collections: Collection[];
  collectionSelected?: number;
};

export default function List({ collections, collectionSelected }: ListProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="hidden lg:block lg:w-1/2">
        <nav
          aria-label="Sections"
          className="flex-shrink-0 bg-white border-r border-blue-gray-200 flex flex-col max-h-screen lg:min-h-screen relative overflow-y-auto"
        >
          <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
            <p className="text-lg font-medium text-blue-gray-900">Contenus</p>
          </div>
          <ul className="flex-1 min-h-0 overflow-y-auto">
            {collections.map((collection) => (
              <Link
                href={`/admin/content/${collection.id}`}
                key={collection.name}
              >
                <li>
                  <a
                    className={cx(
                      "flex p-6 border-b border-gray-200 hover:bg-blue-50 hover:bg-opacity-50 cursor-pointer",
                      collection.id === collectionSelected &&
                        "bg-opacity-50 bg-blue-50"
                    )}
                  >
                    <div className="ml-3 text-sm">
                      <p className="font-medium text-gray-900">
                        {collection.name}
                      </p>
                      <p className="mt-1 text-gray-500">
                        {collection.description}
                      </p>
                    </div>
                  </a>
                </li>
              </Link>
            ))}
            <li className="bg-teal-100 flex p-6 border-b border-gray-200 lg:absolute lg:bottom-0 w-full">
              <div className="ml-3 text-sm flex">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Créer un nouveau contenu
                </button>
                <ModalNoSSR>
                  <Create {...{ open, setOpen }} />
                </ModalNoSSR>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
