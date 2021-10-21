import React, { FunctionComponent} from "react";
import Link from "next/link";

import styles from "./sideNav.module.css";
import { useRouter } from "next/dist/client/router";

const SideNav: FunctionComponent = () => {
  const router = useRouter();

  return (
    <nav className={styles.outerNav}>
      <ul>
        <Link href={"/dashboard"}>
          <a
            className={
              router.pathname.startsWith("/dashboard") ? styles.active : ""
            }
          >
            Dashboard
          </a>
        </Link>
        <Link href={"/automate"}>
          <a
            className={
              router.pathname.startsWith("/automate") ? styles.active : ""
            }
          >
            Automate
          </a>
        </Link>
      </ul>
    </nav>
  );
};

export default SideNav;
