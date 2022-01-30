import { Collection } from "@prisma/client"
import type { NextPage } from "next"
import { useState } from "react"
import Empty from "../../../../features/collections/components/empty/empty"
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
  const [open, setOpen] = useState(false)
  const { collections } = data

  if (collections.length > 0) {
    return (
      <>
        <List setOpen={setOpen} collections={collections} />
        <New open={open} setOpen={setOpen} />
      </>
    )
  }

  return (
    <>
      <Empty setOpen={setOpen} />
      <New open={open} setOpen={setOpen} />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`)
  const data = await res.json()
  return { props: { data } }
}

export default AdminCollectionPage
