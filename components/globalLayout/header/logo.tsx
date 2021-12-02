import { FunctionComponent } from "react";
import Link from "next/link";

import { Gear } from "@public/svg";
import styles from "./header.module.css";

const Logo:FunctionComponent = () => {
  return (
    <Link href="/" passHref={true}>
      <a className={styles.logo}>
        <Gear />
        <span>Cryptomate</span>
      </a>
    </Link>
  );
};

export default Logo;