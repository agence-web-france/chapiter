import { Collection } from "@prisma/client";
import type { NextPage } from "next";
import { useState } from "react";
import Empty from "../../../../features/collections/components/empty/empty";
import New from "../../../../features/collections/components/new/new";

type AdminCollectionPageProps = {
  collections: Collection[];
};

const AdminCollectionPage: NextPage<AdminCollectionPageProps> = ({
  collections,
}) => {
  const [open, setOpen] = useState(false);

  if (collections.length > 0) {
    return <>list</>;
  }

  return (
    <>
      <Empty setOpen={setOpen} />
      <New open={open} setOpen={setOpen} />
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
  const collections = await res.json();
  return { props: { collections } };
}

export default AdminCollectionPage;
