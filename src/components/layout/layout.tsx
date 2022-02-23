import Menu from "components/menu/menu";
import Sidebar from "components/sidebar/sidebar";

type AdminLayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: AdminLayoutProps) {
  return (
    <div className="lg:flex">
      <Sidebar />
      <main className="mb-20 lg:mb-0 w-full">{children}</main>
      <Menu />
    </div>
  );
}
