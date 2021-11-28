import { FunctionComponent } from "react";

import ChartDisplay from "@components/charting/coinHistory";
import TransactionHistory from "@components/transactionHistory";

import styles from "./searchLayout.module.css";
import ShallowList from "@components/automate/shallowList";

interface Props {
  coinData: {
    baseName: string;
    baseSymbol: string;
    convertedName: string;
    convertedSymbol: string;
  };
}

const SearchPageComponents: FunctionComponent<Props> = ({ coinData }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <ChartDisplay baseSymbol={coinData.baseSymbol} convertedSymbol={coinData.convertedSymbol} />
        <TransactionHistory
          baseSymbol={coinData.baseSymbol}
          convertedSymbol={coinData.convertedSymbol}
        />
      </div>
      <div className={styles.right}>
        <ShallowList
          baseSymbol={coinData.baseSymbol}
          convertedSymbol={coinData.convertedSymbol}
        />
      </div>
    </div>
  );
};

export default SearchPageComponents;
