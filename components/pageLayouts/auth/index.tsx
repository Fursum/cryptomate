import { FunctionComponent } from "react";
import { signIn, ClientSafeProvider } from "next-auth/client";

import styles from "./auth.module.css";
import Gear from "@public/svg/component/gear";

interface Props {
  providers: Record<string, ClientSafeProvider> | null;
}

const AuthLayout: FunctionComponent<Props> = ({ providers }) => {
  return (
    <div className={styles.authContainer}>
      <div className={styles.logo}>
        <Gear />
      </div>

      <span>Sign in with</span>
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button className={styles.authButton} onClick={() => signIn(provider.id)}>
            {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AuthLayout;
