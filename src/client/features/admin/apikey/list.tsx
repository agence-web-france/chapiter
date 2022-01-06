/* This example requires Tailwind CSS v2.0+ */
import { PaperClipIcon } from '@heroicons/react/solid'

export default function ApiKeysList() {
  return (
    <>
      <div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">Clés API</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Lister et créer vos clés API.</p>
      </div>
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Agence Web France</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">06eaa10d-e5f0-4ed4-8f19-c3c7b0764400</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Supprimer
                </button>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}
