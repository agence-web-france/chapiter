import { Collection } from '@prisma/client'
import type { NextPage } from 'next'
import Empty from '../../../../features/collections/components/empty/empty'

type AdminCollectionPageProps = {
  collections: Collection[]
}

const AdminCollectionPage: NextPage<AdminCollectionPageProps> = ({ collections }) => {

  if (collections.length > 0) {
    return <>list</>
  }

  return (
    <>
      <Empty />
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3000/api/collections`)
  const collections = await res.json()
  return { props: { collections } }
}

export default AdminCollectionPage
