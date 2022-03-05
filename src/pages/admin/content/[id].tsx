import { Collection, Component } from "@prisma/client";
import ListCollections from "features/collections/components/list/list";
import ListComponents from "features/components/components/list/list";
import type { NextPage } from "next";

type CollectionWithComponents = Collection & { components: Component[] };

type AdminCollectionPageProps = {
  collection: CollectionWithComponents;
  collections: Collection[];
};

const Collections: NextPage<AdminCollectionPageProps> = ({
  collection,
  collections,
}) => {
  return (
    <>
      <div className="lg:flex w-full">
        <ListCollections
          collections={collections}
          collectionSelected={collection.id}
        />
        <ListComponents
          collection={collection}
          components={collection.components}
        />
      </div>
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
