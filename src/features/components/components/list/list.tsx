import { PlusIcon } from "@heroicons/react/outline";
import { Collection, Component } from "@prisma/client";
import ModalNoSSR from "components/modal/modal";
import Create from "features/components/components/create/create";
import Link from "next/link";
import { useState } from "react";
import cx from "classnames";
import Empty from "features/components/components/empty/empty";
import Breadcrumb from "components/breadcrumb/breadcrumb";

type ListProps = {
  collection: Collection;
  components: Component[];
};

export default function List({ collection, components }: ListProps) {
  const [open, setOpen] = useState(false);
  const pages = [
    { name: "Contenus", href: "/admin/content" },
    { name: collection.name, href: `/admin/content/${collection.id}` },
  ];
  const componentsIsEmpty = components.length === 0;
  return (
    <>
      <div className="lg:w-1/2">
        <Breadcrumb {...{ pages }} />
        <nav
          aria-label="Sections"
          className="flex-shrink-0 bg-white border-r border-blue-gray-200 flex flex-col max-h-screen lg:min-h-screen relative overflow-y-auto"
        >
          <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
            <p className="text-lg font-medium text-blue-gray-900">
              {collection.name}
            </p>
          </div>
          <ul className="flex-1 min-h-0 overflow-y-auto">
            {componentsIsEmpty && <Empty collection={collection} />}
            {!componentsIsEmpty &&
              components.map((component) => (
                <Link
                  href={`/admin/content/${component.id}`}
                  key={component.name}
                >
                  <li>
                    <a
                      className={cx(
                        "flex p-6 border-b border-gray-200 hover:bg-blue-50 hover:bg-opacity-50 cursor-pointer"
                      )}
                    >
                      <div className="ml-3 text-sm">
                        <p className="font-medium text-gray-900">
                          {component.name}
                        </p>
                      </div>
                    </a>
                  </li>
                </Link>
              ))}
            <li
              className={cx(
                "bg-teal-100 lg:flex p-6 border-b border-gray-200 lg:absolute lg:bottom-0 w-full",
                componentsIsEmpty && "hidden"
              )}
            >
              <div className="ml-3 text-sm flex">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={() => setOpen(true)}
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Créer un nouvel élément
                </button>
                <ModalNoSSR>
                  <Create {...{ open, setOpen, collection }} />
                </ModalNoSSR>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
