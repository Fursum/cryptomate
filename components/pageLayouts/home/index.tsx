import { FunctionComponent } from "react";
import HomepageCards from "@components/homepageCards";
import styles from "./homeLayout.module.css";
import SignIn from "@components/auth/signin";

const HomeLayout: FunctionComponent = () => {
  return (
    <div className={styles.content}>
      <div className={styles.contentBackground}>
        <h1>Automate your trading with Cryptomate</h1>
        <HomepageCards />
        <SignIn/>
      </div>
    </div>
  );
};

export default HomeLayout;
