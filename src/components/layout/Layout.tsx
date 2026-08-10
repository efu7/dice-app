import type{ ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props) {
  return <main className="layout">{children}</main>;
}

export default Layout;