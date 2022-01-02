import SignOut from "@components/auth/signout";
import { useSession } from "next-auth/client";
import { FunctionComponent } from "react";

import styles from "./profile.module.css";

const ProfileLayout: FunctionComponent = () => {
  const [session, loading] = useSession();

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.profileContent}>
        <h2>Welcome {session?.user?.name}</h2>
        <SignOut />
      </div>
    </div>
  );
};

export default ProfileLayout;
