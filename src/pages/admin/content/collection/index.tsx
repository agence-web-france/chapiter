import { Collection } from "@prisma/client"
import type { NextPage } from "next"
import React, { useState } from "react"
import { CollectionContext } from "../../../../features/collections/ context/collection"
import List from "../../../../features/collections/components/list/list"
import New from "../../../../features/collections/components/new/new"

type AdminCollectionPageProps = {
  data: {
    collections: Collection[]
  }
}

const AdminCollectionPage: NextPage<AdminCollectionPageProps> = ({
  data,
}) => {
  const { collections } = data

  const [showNewModal, setShowNewModal] = useState(false)
  const collectionContextValue = {
    modal: {
      new: { showNewModal, setShowNewModal }
    }
  }

  return <CollectionContext.Provider value={collectionContextValue}>
    <List collections={collections} />
    <New />
  </CollectionContext.Provider>
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
  const data = await res.json()
  return { props: { data } }
}

export default AdminCollectionPage
