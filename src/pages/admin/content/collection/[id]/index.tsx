import { Collection } from "@prisma/client"
import type { GetServerSidePropsContext, NextPage } from "next"

type AdminCollectionByIdPageProps = {
  data: {
    collection: Collection
  }
}


const AdminCollectionByIdPage: NextPage<AdminCollectionByIdPageProps> = ({ data }) => {
  const { collection } = data
  return <></>
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${context.params?.id}`)
  const data = await res.json()
  return { props: { data } }
}

export default AdminCollectionByIdPage