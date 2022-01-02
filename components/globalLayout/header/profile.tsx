import { FunctionComponent } from "react";
import Link from "next/link";

import styles from "./header.module.css";
import ImageFallback from "@components/imageFallback";
import { useSession } from "next-auth/client";

const Profile: FunctionComponent = () => {

  const [session, loading] = useSession();

  return (
    <Link href="/profile" passHref={true}>
      <a className={styles.profile}>
        <ImageFallback
          src={session ? session.user?.image! : "/person.png"}
          fallbackSrc="/person.png"
          width="50px"
          height="60px"
          layout="responsive"
          alt="Profile Image"
        />
      </a>
    </Link>
  );
};

export default Profile;
