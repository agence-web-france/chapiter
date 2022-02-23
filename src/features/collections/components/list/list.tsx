import { Collection } from "@prisma/client";

type ListProps = {
  collections: Collection[];
};

export default function List({ collections }: ListProps) {
  return <>
    <div className="p-6 m-6 rounded border bg-white card">
      <h2 className="text-2xl font-semibold">
        Liste des collections
      </h2>
      <div className="flow-root mt-6">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {collections.map((collection) => (
            <li key={collection.name} className="py-4">
              <div className="flex items-center space-x-2">
                <div className="flex-shrink-0">
                </div>
                <div className="flex-1 min-w-0 pr-4">
                  <p className="text-sm font-medium text-gray-900 truncate">{collection.name}</p>
                  <p className="text-xs font-medium text-gray-900 truncate">{collection.description}</p>
                </div>
                <div>
                  <button
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Éditer
                  </button>
                </div>
                <div>
                  <button
                    className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-red-300 text-sm leading-5 font-medium rounded-full text-red-700 bg-white hover:bg-red-50"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
}