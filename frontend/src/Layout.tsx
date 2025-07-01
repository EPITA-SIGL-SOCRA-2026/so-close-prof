import React from "react";
import { Navbar } from "./NavBar";

export function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </>
  );
}
