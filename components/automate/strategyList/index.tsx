import randomID from "@libs/functions/randomID";
import { FunctionComponent, useEffect, useState } from "react";
import useSWR from "swr";

import { Strategy_T } from "@components/automate/AutomateTypes";
import ListDisplay from "./listDisplay";

import styles from "./strategyList.module.css";

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
const StrategyList: FunctionComponent<Props> = ({ baseSymbol, convertedSymbol }) => {
  const queryURL = `/api/automate/${baseSymbol}/${convertedSymbol}`;
  const { data, error } = useSWR<any, Error>(queryURL, fetcher);

  //Assign fetched data to component state, to make it modifiable
  const [strategyList, setStrategyList] = useState<Strategy_T[]>([]);
  useEffect(() => {
    if (data) setStrategyList(data.list);
  }, [data]);

  const createNewStrategy = () => {
    const now = new Date(Date.now());
    const newStrategy: Strategy_T = {
      id: randomID(),
      title: "Untitled Strategy",
      creationDate: now,
      lastUpdate: now,
      orderList: [],
      totalBuyCap: 0,
    };
    setStrategyList((old) => [...old, newStrategy]);
  };

  const removeStrategy = (id: string) => {
    setStrategyList((old) => old.filter((e) => e.id != id));
  };

  const updateStrategy = (strategy: Strategy_T) => {
    setStrategyList((prevData) => {
      const index = prevData.findIndex((e) => e.id == strategy.id);
      let newData = [...prevData];
      newData[index] = strategy;
      return newData;
    });
  };

  return (
    <div className={styles.strategyContainer}>
      <h3>Current Strategies</h3>
      {!error ? (
        <ListDisplay
          strategyList={strategyList}
          updateStrategy={updateStrategy}
          removeStrategy={removeStrategy}
          createStrategy={createNewStrategy}
        />
      ) : (
        <div className="error">{error.message}</div>
      )}
    </div>
  );
};

export default StrategyList;
