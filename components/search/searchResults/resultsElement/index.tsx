import { useRouter } from "next/router";
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
  const quoteName = CoinData.getCoin(data.quoteAsset, "name")

  const handleClick = () => {
    router.push(`/search/${data.baseAsset}/${data.quoteAsset}`);
  };

  return (
    <div className={styles.outerButton} onClick={handleClick}>
      <div className={styles.leftSide}>
        <p className={styles.symbol}>{data.baseAsset}</p>
        <p className={styles.name}>{baseName || data.baseAsset}</p>
      </div>
      <div className={styles.rightSide}>
        <p className={styles.symbol}>{data.quoteAsset}</p>
        <p className={styles.name}>{quoteName || data.quoteAsset}</p>
      </div>
    </div>
  );
};

export default ResultsElement;
