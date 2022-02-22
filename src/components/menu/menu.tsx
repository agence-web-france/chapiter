import Link from "next/link";
import {
  BookOpenIcon,
  CollectionIcon,
  CubeTransparentIcon,
  AnnotationIcon,
  ChartSquareBarIcon,
} from "@heroicons/react/outline";

const links = [
  { name: "Pages", href: "/admin/pages/", icon: BookOpenIcon },
  { name: "Collections", href: "/admin/collections/", icon: CollectionIcon },
  { name: "Composants", href: "/admin/components/", icon: CubeTransparentIcon },
  { name: "Messages", href: "/admin/messages", icon: AnnotationIcon },
  { name: "Statistiques", href: "/admin/stats/", icon: ChartSquareBarIcon },
];

export default function Menu() {
  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 w-full border-t border-gray-300">
        <ul className="flex justify-between items-center overflow-x-auto px-4 py-2 mx-auto max-w-md">
          {links.map((link) => (
            <li key={link.name} className="p-2">
              <Link href={link.href}>
                <a className="flex items-center flex-col">
                  <link.icon
                    className="flex-shrink-0 h-6 w-6 text-gray-500 mb-1"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-gray-600">{link.name}</span>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
