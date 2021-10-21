import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/client";

import SignIn from "./auth/signin";
import { Gear } from "@public/svg";
import styles from "./header.module.css";

const Header: FunctionComponent = () => {

    const [session, loading] = useSession();
    
    return (
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            <Gear />
            <span>Cryptomate</span>
          </div>
        </Link>

        {session && (
          <Link href="/profile">
            <span className={styles.profile}>
              <Image
                src="/person.png"
                width="50px"
                height="60px"
                layout="responsive"
              />
            </span>
          </Link>
        )}

        {!session && !loading && <SignIn />}
      </div>
    );
};

export default Header;
