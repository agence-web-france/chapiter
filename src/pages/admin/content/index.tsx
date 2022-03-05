import { Collection } from "@prisma/client";
import Create from "features/collections/components/create/create";
import List from "features/collections/components/list/list";
import type { NextPage } from "next";

type AdminCollectionPageProps = {
  collections: Collection[];
};

const Collections: NextPage<AdminCollectionPageProps> = ({
  collections,
}) => {
  return (
    <>
      <List collections={collections} />
    </>
  );
};

export default Collections;

export async function getStaticProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections`
  );
  const { collections } = await res.json();
  return {
    props: {
      collections,
    },
  };
}
