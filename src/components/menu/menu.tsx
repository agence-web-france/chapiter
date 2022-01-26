import Link from "next/link"
import { useRouter } from "next/router"
import { HomeIcon as HomeIconSolid } from '@heroicons/react/solid'
import { HomeIcon as HomeIconOutline } from '@heroicons/react/outline'
import { PencilAltIcon as PencilAltIconSolid } from '@heroicons/react/solid'
import { PencilAltIcon as PencilAltIconOutline } from '@heroicons/react/outline'
import { ChartBarIcon as ChartBarIconSolid } from '@heroicons/react/solid'
import { ChartBarIcon as ChartBarIconOutline } from '@heroicons/react/outline'
import { ChatAlt2Icon as ChatAlt2IconSolid } from '@heroicons/react/solid'
import { ChatAlt2Icon as ChatAlt2IconOutline } from '@heroicons/react/outline'

type PrimaryPage = {
  name: string;
  path: string;
  icon: {
    neutral: JSX.Element;
    active: JSX.Element;
  };
}

type PrimaryMenuItemProps = {
  page: PrimaryPage
}

type SecondaryContentPage = {
  name: string;
  path: string;
}

type SecondaryContentMenuItemProps = {
  page: SecondaryContentPage
}

const pages = {
  primary: [
    {
      name: "Accueil",
      path: "/admin/home",
      icon: {
        neutral: <HomeIconOutline className="h-6 w-6 text-gray-500" />,
        active: <HomeIconSolid className="h-6 w-6 text-indigo-500" />
      },
    },
    {
      name: "Contenu",
      path: "/admin/content",
      icon: {
        neutral: <PencilAltIconOutline className="h-6 w-6 text-gray-500" />,
        active: <PencilAltIconSolid className="h-6 w-6 text-indigo-500" />
      }
    },
    {
      name: "Donnée",
      path: "/admin/data",
      icon: {
        neutral: <ChartBarIconOutline className="h-6 w-6 text-gray-500" />,
        active: <ChartBarIconSolid className="h-6 w-6 text-indigo-500" />
      }
    },
    {
      name: "Message",
      path: "/admin/message",
      icon: {
        neutral: <ChatAlt2IconOutline className="h-6 w-6 text-gray-500" />,
        active: <ChatAlt2IconSolid className="h-6 w-6 text-indigo-500" />
      }
    },
  ],
  secondary: {
    content: [
      {
        name: "Collection",
        path: "collection"
      },
      {
        name: "Composant",
        path: "composant"
      },
      {
        name: "Page",
        path: "page"
      }
    ]
  }
}


export const PrimaryMenu = () => {
  const Item = ({ page }: PrimaryMenuItemProps) => {
    const { pathname } = useRouter()
    const { path, icon, name } = page
    const isActive = (path: string) => pathname.includes(path)
    console.log(pathname, "includes", path)

    if (isActive(path)) {
      return <>
        <li>
          <Link href={path}>
            <a className="flex p-2 items-center justify-between flex-col text-indigo-500 font-medium">
              {icon.active}
              {name}
            </a>
          </Link>
        </li>
      </>
    }

    return <>
      <li>
        <Link href={path}>
          <a className="flex p-2 items-center justify-between flex-col">
            {icon.neutral}
            {name}
          </a>
        </Link>
      </li>
    </>
  }
  return <>
    <ul className="fixed z-10 bottom-0 left-0 right-0 border-t border-gray-100 flex items-center justify-around text-sm">
      {pages.primary.map(page => (
        <Item key={`key-${page.path}`} page={page} />
      ))}
    </ul>
  </>
}

export const SecondaryContentMenu = () => {
  const Item = ({ page }: SecondaryContentMenuItemProps) => {
    const { pathname } = useRouter()
    const { name, path } = page
    const isActive = (path: string) => pathname.includes(path)

    if (isActive(path)) {
      return <>
        <li>
          <Link href={`/admin/content/${path}`}>
            <a className="mx-2 p-4 block border-b-2 border-indigo-500 text-indigo-500 font-medium text-sm">{name}</a>
          </Link>
        </li>
      </>
    }

    return <>
      <li>
        <Link href={`/admin/content/${path}`}>
          <a className="mx-2 p-4 block font-medium text-sm">{name}</a>
        </Link>
      </li>
    </>
  }
  return <>
    <ul className="fixed z-10 top-0 left-0 right-0 flex shadow">
      {pages.secondary.content.map(page => (
        <Item page={page} key={`key-${page.path}`} />
      ))}
    </ul>
  </>
}

