import { FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/client";

import SignIn from "./auth/signin";
import { Gear } from "@public/svg";
import styles from "./header.module.css";
import SearchBar from "@components/search";

const Header: FunctionComponent = () => {
  const [session, loading] = useSession();

  return (
    <div className={styles.header}>
      <Link href="/" passHref={true}>
        <div className={styles.logo}>
          <Gear />
          <span>Cryptomate</span>
        </div>
      </Link>
      <SearchBar />
      {session && (
        <Link href="/profile" passHref={true}>
          <span className={styles.profile}>
            <Image
              src="/person.png"
              width="50px"
              height="60px"
              layout="responsive"
              alt="Profile Image"
            />
          </span>
        </Link>
      )}

      {!session && !loading && <SignIn />}
    </div>
  );
};

export default Header;
