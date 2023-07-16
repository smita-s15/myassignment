import React from "react";
import Link from "next/link";

import styles from "./sidenav.module.scss";
import { useRouter } from "next/router";

function Sidenav() {
  const router = useRouter();

  return (
    <div className={styles.sidenav}>
      <Link href="/profile">
        Profile
        {router.pathname === "/profile" && (
          <div className={styles.right}>
            <img src="/chevron.svg" alt="" />
          </div>
        )}
      </Link>
      <Link href="/gallery">
        Gallery
        {router.pathname === "/gallery" && (
          <div className={styles.right}>
            <img src="/chevron.svg" alt="" />
          </div>
        )}
      </Link>
      <Link href="/posts">
        Posts
        {router.pathname === "/posts" && (
          <div className={styles.right}>
            <img src="/chevron.svg" alt="" />
          </div>
        )}
      </Link>
      <Link href="/todo">
        Todo
        {router.pathname === "/todo" && (
          <div className={styles.right}>
            <img src="/chevron.svg" alt="" />
          </div>
        )}
      </Link>
    </div>
  );
}

export default Sidenav;
