import Image from "next/image";
import React, { useState } from "react";
import styles from "@/styles/Components.module.css";
import { Drawer } from "@mui/material";
import OpenDrawer from "./OpenDrawer";

const Navbar = () => {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  return (
    <nav className={styles.nav}>
      <div className={styles.navTitle}>
        <h1>Petshop</h1>
      </div>
      <div className={styles.navContainer}>
        <Image
          onClick={() => setToggleDrawer(true)}
          className={styles.navMenu}
          src={"/img/menu.svg"}
          alt="menu"
          width={39}
          height={39}
        />
      </div>
      <Drawer
        anchor="right"
        open={toggleDrawer}
        onClose={() => setToggleDrawer(false)}
      >
        <OpenDrawer />
      </Drawer>
    </nav>
  );
};

export default Navbar;
