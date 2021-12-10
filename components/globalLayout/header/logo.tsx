import { FunctionComponent } from "react";
import Link from "next/link";
import { Session } from "next-auth";

import { Gear } from "@public/svg";
import styles from "./header.module.css";

interface Props {
  session: Session | null;
}

const Logo: FunctionComponent<Props> = ({ session }) => {
  return (
    <Link href={`/${session ? "dashboard": ""}`} passHref>
      <a className={styles.logo}>
        <Gear />
        <span>Cryptomate</span>
      </a>
    </Link>
  );
};

export default Logo;
