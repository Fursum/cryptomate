import { FunctionComponent } from "react";
import useSWR from "swr";

import styles from "./shallowList.module.css";
import { ActionData_T } from "../AutomateTypes";

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

//This component displays surface information for current automated actions
const ShallowList: FunctionComponent<Props> = ({ baseSymbol, convertedSymbol }) => {
  const queryURL = `/api/automate/${baseSymbol}/${convertedSymbol}`;
  const { data, error } = useSWR<any, Error>(queryURL, fetcher);

  //TODO: Swap key out with data key later
  const ActionList = data?.actions.map((e: ActionData_T, index: number) => {
    return <div key={index} className={styles.shallowAction}>
      <span className={styles.action}>{e.actionType}</span>
      <span className={styles.value}>{e.actionValue}</span>
    </div>;
  });

  return (
    <div className={styles.actionList}>
      <h3>Automated Orders</h3>
      {!error ? ActionList : <div className="error">{error.message}</div>}
    </div>
  );
};

export default ShallowList;
