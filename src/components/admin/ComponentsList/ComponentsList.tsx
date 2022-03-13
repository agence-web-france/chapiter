import Link from "next/link";
import EmptyState from "components/admin/EmptyState/EmptyState";
import { Component } from "@prisma/client";
import NewComponentButton from "../NewComponentButton/NewComponentButton";

type ComponentsListProps = {
  components: Component[];
};

const ComponentsList = ({ components }: ComponentsListProps) => {
  return (
    <section className="p-4 max-w-5xl mx-auto">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Composants</h1>
            <p className="mt-2 text-sm text-gray-700">
              Une liste de tous les composants de votre site web.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <NewComponentButton />
          </div>
        </div>
        <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Nom
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Description
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Modifier</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {components.map((component) => (
                <tr key={component.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {component.name}
                  </td>
                  <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    {component.description}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <Link href={`/admin/component/${component.id}`}>
                      <a className="text-indigo-600 hover:text-indigo-900">
                        Modifier<span className="sr-only"></span>
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {components.length === 0 && (
            <EmptyState
              title="Aucun composant"
              description="Vous n'avez pas encore de composant."
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ComponentsList;
