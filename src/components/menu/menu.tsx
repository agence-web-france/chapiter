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

type Page = {
  name: string;
  path: string;
  icon: {
    neutral: JSX.Element;
    active: JSX.Element;
  };
}

type MenuItemProps = {
  page: Page
}

const pages = [
  {
    name: "Accueil",
    path: "/admin/home",
    icon: {
      neutral: <HomeIconOutline className="h-6 w-6 text-gray-500" />,
      active: <HomeIconSolid className="h-6 w-6 text-indigo-500" />
    }
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
    name: "Données",
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
]

export const Menu = () => {
  return <>
    <ul className="fixed z-50 bottom-0 left-0 right-0 border-t border-gray-300 flex items-center justify-evenly text-sm">
      {pages.map(page => (
        <MenuItem key={`key-${page.path}`} page={page} />
      ))}
    </ul>
  </>
}

const MenuItem = ({ page }: MenuItemProps) => {
  const { pathname } = useRouter()
  const { path, icon, name } = page
  const isActive = (path: string) => path.includes(pathname)

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