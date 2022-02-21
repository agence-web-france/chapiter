type AdminLayoutProps = {
  children: JSX.Element
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <main>
        {children}
      </main>
    </>
  )
}
