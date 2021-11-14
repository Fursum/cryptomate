import { signOut } from "next-auth/client";
import { FunctionComponent } from "react";

import styles from "./auth.module.css";

const SignOut: FunctionComponent = () => {
  return (
    <span className={styles.signOut}>
      <a
        href={`/api/auth/signout`}
        className={styles.authButton}
        onClick={(e) => {
          e.preventDefault();
          signOut();
        }}
      >
        Sign out
      </a>
    </span>
  );
};

export default SignOut;
