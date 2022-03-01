import { Collection } from "@prisma/client";
import Create from "features/collections/components/create/create";
import List from "features/collections/components/list/list";
import type { NextPage } from "next";

type AdminCollectionPageProps = {
  collection: Collection;
  collections: Collection[];
};

const Collections: NextPage<AdminCollectionPageProps> = ({
  collection,
  collections,
}) => {
  return (
    <>
      <List collections={collections} collectionSelected={collection.id} />
    </>
  );
};

export default Collections;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  const { collections }: { collections: Collection[] } = await res.json();
  const paths = collections.map((collection) => ({
    params: { id: collection.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/collections/${params.id}?collections`
  );
  const { collection, collections } = await res.json();
  return {
    props: {
      collection,
      collections,
    },
  };
}
