import Menu from "components/menu/menu";
import Sidebar from "components/sidebar/sidebar";

type AdminLayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: AdminLayoutProps) {
  return (
    <>
      <Sidebar />
      <Menu />
      <main>{children}</main>
    </>
  );
}
