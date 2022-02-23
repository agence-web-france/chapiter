import Link from "next/link";
import {
  BookOpenIcon,
  CollectionIcon,
  CubeTransparentIcon,
  AnnotationIcon,
  ChartSquareBarIcon,
} from "@heroicons/react/outline";

import cx from "classnames";
import { useRouter } from "next/router";

const links = [
  { name: "Pages", href: "/admin/pages", icon: BookOpenIcon },
  { name: "Collections", href: "/admin/collections", icon: CollectionIcon },
  { name: "Composants", href: "/admin/components", icon: CubeTransparentIcon },
  { name: "Messages", href: "/admin/messages", icon: AnnotationIcon },
  { name: "Statistiques", href: "/admin/stats", icon: ChartSquareBarIcon },
];

export default function Menu() {
  const router = useRouter()
  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 w-full border-t border-gray-300">
        <ul className="flex justify-between items-center overflow-x-auto px-4 py-2 mx-auto max-w-md">
          {links.map((link) => (
            <li key={link.name} className="p-2">
              <Link href={link.href}>
                <a className={cx("flex items-center flex-col", router.asPath === link.href ? "text-teal-700" : "text-gray-500")}>
                  <link.icon
                    className="flex-shrink-0 h-6 w-6 mb-1"
                    aria-hidden="true"
                  />
                  <span className="text-xs">{link.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
