import Image from "next/image";
import { FunctionComponent } from "react";
import styles from "./homepageCards.module.css";

const HomepageCards: FunctionComponent = () => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.imageWrap}>
          <div className={styles.image}>
            <Image
              src={"/svg/raw/test-graph.svg"}
              alt={"Graph of two lines, one increasing and one decreasing."}
              layout={"fill"}
            />
          </div>
        </div>
        <span className={styles.title}>Test</span>
      </div>
      <div className={styles.card}>
        <div className={styles.imageWrap}>
          <div className={styles.image}>
            <Image
              src={"/svg/raw/deploy-graph.svg"}
              alt={"Graph of two lines, one increasing and one decreasing."}
              layout={"fill"}
            />
          </div>
        </div>
        <span className={styles.title}>Deploy</span>
      </div>
      <div className={styles.card}>
        <div className={styles.imageWrap}>
          <div className={styles.image}>
            <span className={styles.dollar}>$$$</span>
          </div>
        </div>
        <span className={styles.title}>Profit</span>
      </div>
    </div>
  );
};

export default HomepageCards;
