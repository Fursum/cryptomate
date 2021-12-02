import { FunctionComponent } from "react";

import ChartDisplay from "@components/charting/coinHistory";
import TransactionHistory from "@components/transactionHistory";

import styles from "./searchLayout.module.css";
import StrategyList from "@components/automate/strategyList";

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
    <div className={styles.layoutWithTitle}>
      <h1>{`${coinData.baseSymbol} / ${coinData.convertedSymbol}`}</h1>
      <div className={styles.layout}>
        <div className={styles.left}>
          <ChartDisplay
            baseSymbol={coinData.baseSymbol}
            convertedSymbol={coinData.convertedSymbol}
          />
          <TransactionHistory
            baseSymbol={coinData.baseSymbol}
            convertedSymbol={coinData.convertedSymbol}
          />
        </div>
        <div className={styles.right}>
          <StrategyList
            baseSymbol={coinData.baseSymbol}
            convertedSymbol={coinData.convertedSymbol}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPageComponents;
