import Head from "next/head";
import React from "react";
import { Roboto } from "next/font/google";
import { ILayoutProps } from "@/Libs/interfaces";
import Navbar from "./Navbar";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  subsets: ["latin"]
});

const Layout: React.FC<ILayoutProps> = ({children}) => {
  return (
    <>
      <Head>
        <title>Calcular</title>
      </Head>
      <div className={roboto.className}>
        <Navbar />
        {children}
      </div>
    </>
  );
};

export default Layout;
