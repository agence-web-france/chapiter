import Image from "next/image";
import Link from "next/link";

import {
  BookOpenIcon,
  CollectionIcon,
  CubeTransparentIcon,
  HomeIcon,
  AnnotationIcon,
  ChartSquareBarIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

const content = [
  { name: "Accueil", href: "/admin/", icon: HomeIcon },
  { name: "Pages", href: "/admin/pages/", icon: BookOpenIcon },
  { name: "Collections", href: "/admin/collections/", icon: CollectionIcon },
  { name: "Composants", href: "/admin/components/", icon: CubeTransparentIcon },
];

const activity = [
  { name: "Messages", href: "/admin/messages", icon: AnnotationIcon },
  { name: "Statistiques", href: "/admin/stats/", icon: ChartSquareBarIcon },
];

export default function AdminMenu() {
  return (
    <>
      <section className="bg-teal-900 h-screen lg:w-1/5 w-full fixed top-0 left-0 p-8">
        <div className="max-h-screen relative overflow-y-auto">
          <div className="flex items-center mb-8">
            <div className="bg-teal-800 flex items-center p-2">
              <Image
                src="/images/logo-white.svg"
                alt=""
                width={24}
                height={24}
              />
            </div>
            <h1 className="text-white text-xl font-semibold ml-4">
              agence-web-france.com
            </h1>
          </div>
          <div className="mb-16">
            <p className="text-teal-50">
              Gérez le contenu ainsi que l'activité de votre site web depuis
              votre interface d'administration.
            </p>
          </div>
          <div className="mb-16">
            <h3 className="text-sm font-medium tracking-wide text-teal-50 uppercase">
              Gestion du contenu
            </h3>
            <ul role="list" className="mt-5">
              {content.map((item) => (
                <li key={item.name} className="flow-root">
                  <Link href={item.href}>
                    <a className="p-3 flex items-center rounded-md text-base font-medium text-teal-50 hover:bg-teal-800 transition ease-in-out duration-150">
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-teal-50"
                        aria-hidden="true"
                      />
                      <span className="ml-4">{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-8">
            <h3 className="text-sm font-medium tracking-wide text-teal-50 uppercase">
              Gestion de l'activité
            </h3>
            <ul role="list" className="mt-5">
              {activity.map((item) => (
                <li key={item.name} className="flow-root">
                  <Link href={item.href}>
                    <a className="p-3 flex items-center rounded-md text-base font-medium text-teal-50 hover:bg-teal-800 transition ease-in-out duration-150">
                      <item.icon
                        className="flex-shrink-0 h-6 w-6 text-teal-50"
                        aria-hidden="true"
                      />
                      <span className="ml-4">{item.name}</span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button className="flex items-center py-4 px-6 bg-teal-800 text-teal-50 absolute bottom-8 left-8 hover:bg-teal-700 transition ease-in-out duration-150">
          <LogoutIcon className="flex-shrink-0 h-6 w-6" aria-hidden="true" />
          <span className="ml-4">Se déconnecter</span>
        </button>
      </section>
    </>
  );
}
