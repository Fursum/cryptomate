import { useRouter } from "next/router";
import Link from "next/link"
import { FunctionComponent } from "react";
import SearchResults_T from "../resultsType";
import CoinData, { CoinData_T } from "@libs/coindata";
import styles from "./resultsElement.module.css";

interface Props {
  data: SearchResults_T;
}

const ResultsElement: FunctionComponent<Props> = ({ data }) => {
  const router = useRouter();
  const baseName = CoinData.getCoin(data.baseAsset, "name");
  const quoteName = CoinData.getCoin(data.quoteAsset, "name");

  return (
    <Link href={`/search/${data.baseAsset}/${data.quoteAsset}`} passHref={true}>
      <a className={styles.outerButton}>
        <div className={styles.leftSide}>
          <p className={styles.symbol}>{data.baseAsset}</p>
          <p className={styles.name}>{baseName || data.baseAsset}</p>
        </div>
        <div className={styles.rightSide}>
          <p className={styles.symbol}>{data.quoteAsset}</p>
          <p className={styles.name}>{quoteName || data.quoteAsset}</p>
        </div>
      </a>
    </Link>
  );
};

export default ResultsElement;
