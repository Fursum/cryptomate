import { FunctionComponent } from "react";
import useSWR from "swr";

import styles from "./transactionHistory.module.css";

interface Props {
  baseSymbol: string;
  convertedSymbol: string;
}

const fetcher = (...args: [RequestInfo, RequestInit]) =>
  fetch(...args).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 401:
        throw new Error("Not signed in.");
      default:
        throw new Error("Cannot fetch history data.");
    }
  });

const TransactionHistory: FunctionComponent<Props> = ({ baseSymbol, convertedSymbol }) => {
  const queryURL = `/api/transactions/${baseSymbol}/${convertedSymbol}`;
  const { data, error } = useSWR<any, Error>(queryURL, fetcher);

  const TransactionList =
    data?.history &&
    data.history.map((e: any, i: number) => (
      <div key={i} className={styles.transactionElement}>
        <span className={styles.action}>{e.action}</span>
        <span className={styles.amount}>{e.amount}</span>
        <span className={styles.value}>{e.value}</span>
      </div>
    ));
  const ErrorContent = <div className="error">{error?.message}</div>;

  return (
    <div className={styles.transactionContainer}>
      <h3>Transaction History</h3>
      <div className={styles.transactionList}>{!error ? TransactionList : ErrorContent}</div>
    </div>
  );
};

export default TransactionHistory;
