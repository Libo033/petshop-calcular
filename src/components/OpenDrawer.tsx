import React from 'react'
import styles from '@/styles/Components.module.css'
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  subsets: ["latin"]
});

const OpenDrawer = () => {
  return (
    <div className={roboto.className + " " + styles.openDrawer}>
      Proximamente...
    </div>
  )
}

export default OpenDrawer