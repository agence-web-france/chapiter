/* This example requires Tailwind CSS v2.0+ */
import { HomeIcon } from "@heroicons/react/solid";
import Link from "next/link";

type BreadcrumbProps = {
  pages: { name: string; href: string }[];
};

export default function Breadcrumb({ pages }: BreadcrumbProps) {
  return (
    <nav className="lg:hidden flex" aria-label="Breadcrumb">
      <ol
        role="list"
        className="flex items-center space-x-4 p-4 border-b w-full"
      >
        <li>
          <Link href={"/admin/content"}>
            <a>
              <p className="text-gray-400 hover:text-gray-500">
                <HomeIcon
                  className="flex-shrink-0 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="sr-only">Home</span>
              </p>
            </a>
          </Link>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <Link href={page.href}>
              <a className="flex items-center">
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
                <p className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                  {page.name}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
