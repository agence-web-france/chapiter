import AdminMenu from "components/menu/admin/AdminMenu"

type AdminLayoutProps = {
  children: JSX.Element
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
    <AdminMenu />
      <main>
        {children}
      </main>
    </>
  )
}
