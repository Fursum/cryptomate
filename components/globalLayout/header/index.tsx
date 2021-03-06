import { FunctionComponent } from "react";
import { useSession } from "next-auth/client";

import SignIn from "@components/auth/signin";
import SearchBar from "@components/search";
import Logo from "./logo";

import styles from "./header.module.css";
import Profile from "./profile";

const Header: FunctionComponent = () => {
  const [session, loading] = useSession();

  return (
    <div className={styles.header}>
      <Logo session={session} />
      <SearchBar />
      {session && <Profile />}
      {!session && !loading && <SignIn />}
    </div>
  );
};

export default Header;
