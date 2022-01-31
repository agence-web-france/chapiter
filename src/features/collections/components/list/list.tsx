/* This example requires Tailwind CSS v2.0+ */
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid'
import { Collection } from '@prisma/client'
import { useContext } from 'react'
import { CollectionContext } from '../../ context/collection'
import Empty from '../empty/empty'

type AdminCollectionListProps = {
  collections: Collection[]
}

export default function List({ collections }: AdminCollectionListProps) {
  const collection = useContext(CollectionContext)
  const { setShowNewModal } = collection.modal.new
  const { setShowDeleteModal, setDeleteCollection } = collection.modal.delete

  if (collections.length > 0) {
    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4 max-w-5xl mx-auto">
        {collections.map((collection, index) => (
          <li key={`${collection.name}-${index}`} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 flex flex-col justify-between">
            <div className="w-full flex items-center justify-between p-6 space-x-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="text-gray-900 text-sm font-medium truncate">{collection.name}</h3>
                </div>
                <p className="mt-1 text-gray-500 text-sm truncate">{collection.description}</p>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="w-0 flex-1 flex">
                  <div
                    onClick={() => {
                      setDeleteCollection(collection)
                      setShowDeleteModal(true)
                    }}
                    className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                  >
                    <TrashIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                    <span className="ml-3">Supprimer</span>
                  </div>
                </div>
                <div className="-ml-px w-0 flex-1 flex bg-indigo-500 hover:bg-indigo-600">
                  <a
                    href={""}
                    className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                  >
                    <PencilAltIcon className="w-5 h-5 text-white" aria-hidden="true" />
                    <span className="ml-3 text-white">Éditer</span>
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
        <li>
          <button
            onClick={() => setShowNewModal(true)}
            type="button"
            className="relative block w-full border-2 border-gray-400 border-dashed rounded-lg p-12 text-center hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
              />
            </svg>
            <span className="mt-2 block text-sm font-medium text-gray-900">Créer une collection</span>
          </button>
        </li>
      </ul>
    )
  }

  return <Empty />

}
