import { FunctionComponent } from "react";
import { signIn } from "next-auth/client";
import styles from "./auth.module.css";

const SignIn: FunctionComponent = () => {
  return (
    <span className={styles.signIn}>
      <a
        href={`/api/auth/signin`}
        className={styles.authButton}
        onClick={(e) => {
          e.preventDefault();
          signIn();
        }}
      >
        Sign in
      </a>
    </span>
  );
};

export default SignIn;
