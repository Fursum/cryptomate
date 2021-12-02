import { FunctionComponent } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./header.module.css";

const Profile: FunctionComponent = () => {
  return (
    <Link href="/profile" passHref={true}>
      <a className={styles.profile}>
        <Image
          src="/person.png"
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
