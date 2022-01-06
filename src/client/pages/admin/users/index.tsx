import type { NextPage } from 'next'
import SecurityApiKey from '../../../features/admin/apikey/list'
import UsersInvite from '../../../features/admin/users/invite'
import UsersList from '../../../features/admin/users/list'

const UsersIndex: NextPage = () => {
  return (
    <>
      <UsersInvite />
      <UsersList />
    </>
  )
}

export default UsersIndex
