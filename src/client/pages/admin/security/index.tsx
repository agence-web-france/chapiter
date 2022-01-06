import type { NextPage } from 'next'
import CreateApiKey from '../../../features/admin/apikey/create'
import SecurityApiKey from '../../../features/admin/apikey/list'

const SecurityIndex: NextPage = () => {
  return (
    <>
      <CreateApiKey />
      <SecurityApiKey />
    </>
  )
}

export default SecurityIndex
