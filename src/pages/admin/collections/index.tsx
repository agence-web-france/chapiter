import { Collection } from '@prisma/client';
import Create from 'features/collections/components/create/create';
import List from 'features/collections/components/list/list';
import type { NextPage } from 'next'
import cx from "classnames"

type AdminCollectionPageProps = {
  data: {
    collections: Collection[];
  };
};

import {
  BellIcon,
  BookmarkAltIcon,
  CashIcon,
  CogIcon,
  FireIcon,
  HomeIcon,
  InboxIcon,
  KeyIcon,
  MenuIcon,
  PhotographIcon,
  SearchCircleIcon,
  UserIcon,
  ViewGridAddIcon,
  XIcon,
  CollectionIcon,
  PlusIcon
} from '@heroicons/react/outline'

const subNavigation = [
  {
    name: 'Account',
    description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
    href: '#',
    icon: CogIcon,
    current: true,
  },
  {
    name: 'Notifications',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    href: '#',
    icon: BellIcon,
    current: false,
  },
  {
    name: 'Security',
    description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
    href: '#',
    icon: KeyIcon,
    current: false,
  },
  {
    name: 'Appearance',
    description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
    href: '#',
    icon: PhotographIcon,
    current: false,
  },
  {
    name: 'Billing',
    description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
    href: '#',
    icon: CashIcon,
    current: false,
  },
  {
    name: 'Integrations',
    description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
    href: '#',
    icon: ViewGridAddIcon,
    current: false,
  },
  {
    name: 'Additional Resources',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '#',
    icon: SearchCircleIcon,
    current: false,
  },
  {
    name: 'Account',
    description: 'Ullamcorper id at suspendisse nec id volutpat vestibulum enim. Interdum blandit.',
    href: '#',
    icon: CogIcon,
    current: false,
  },
  {
    name: 'Notifications',
    description: 'Enim, nullam mi vel et libero urna lectus enim. Et sed in maecenas tellus.',
    href: '#',
    icon: BellIcon,
    current: false,
  },
  {
    name: 'Security',
    description: 'Semper accumsan massa vel volutpat massa. Non turpis ut nulla aliquet turpis.',
    href: '#',
    icon: KeyIcon,
    current: false,
  },
  {
    name: 'Appearance',
    description: 'Magna nulla id sed ornare ipsum eget. Massa eget porttitor suscipit consequat.',
    href: '#',
    icon: PhotographIcon,
    current: false,
  },
  {
    name: 'Billing',
    description: 'Orci aliquam arcu egestas turpis cursus. Lectus faucibus netus dui auctor mauris.',
    href: '#',
    icon: CashIcon,
    current: false,
  },
  {
    name: 'Integrations',
    description: 'Nisi, elit volutpat odio urna quis arcu faucibus dui. Mauris adipiscing pellentesque.',
    href: '#',
    icon: ViewGridAddIcon,
    current: false,
  },
  {
    name: 'Additional Resources',
    description: 'Quis viverra netus donec ut auctor fringilla facilisis. Nunc sit donec cursus sit quis et.',
    href: '#',
    icon: SearchCircleIcon,
    current: false,
  },
]

const Collections: NextPage<AdminCollectionPageProps> = ({ data }) => {
  const { collections } = data;
  return (
    <>
      {/* <Create />
      <List collections={collections} /> */}
      <nav
        aria-label="Sections"
        className="hidden flex-shrink-0 w-96 bg-white border-r border-blue-gray-200 xl:flex xl:flex-col max-h-screen min-h-screen relative overflow-y-auto"
      >
        <div className="flex-shrink-0 h-16 px-6 border-b border-blue-gray-200 flex items-center">
          <p className="text-lg font-medium text-blue-gray-900">Collections</p>
        </div>
        <ul className="flex-1 min-h-0 overflow-y-auto pb-16">
          {collections.map((item) => (
            // <li
            //   key={item.name}
            //   className={cx(
            //     item.current ? 'bg-blue-50 bg-opacity-50' : 'hover:bg-blue-50 hover:bg-opacity-50',
            //     'flex p-6 border-b border-gray-200'
            //   )}
            //   aria-current={item.current ? 'page' : undefined}
            // >
            <li
              key={item.name}
              className={cx(
                'flex p-6 border-b border-gray-200 hover:bg-blue-50 hover:bg-opacity-50 cursor-pointer'
              )}
            >
              <div className="ml-3 text-sm">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="mt-1 text-gray-500">{item.description}</p>
              </div>
            </li>
          ))}
          <li className='bg-teal-100 flex p-6 border-b border-gray-200 absolute bottom-0 w-full'>
            <div className="ml-3 text-sm flex">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Créer une nouvelle collection
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Collections

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  const data = await res.json();
  return {
    props: {
      data,
    },
  }
}