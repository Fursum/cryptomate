import { FunctionComponent, useEffect, useState } from "react";
import useSWR from "swr";

import randomID from "@libs/functions/randomID";
import LocalStorage from "@libs/helpers/storage";
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
        throw new Error("Cannot fetch strategy.");
    }
  });

//This component displays surface information for current automated actions
const StrategyList: FunctionComponent<Props> = ({ baseSymbol, convertedSymbol }) => {
  const queryURL = `/api/automate/${baseSymbol}/${convertedSymbol}`;
  const { data, error } = useSWR<any, Error>(queryURL, fetcher);

  const storageKey = `${baseSymbol}/${convertedSymbol}`.toUpperCase();
  
  const [strategyList, setStrategyList] = useState<Strategy_T[]>(LocalStorage.get(storageKey) || []);
  const [discardable, setDiscardable] = useState(false);

  useEffect(() => {
    if (data && !compareData()) setDiscardable(true);
    updateStorage();
  }, [data, strategyList]);

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
    setStrategyList((old) => (old ? [...old, newStrategy] : [newStrategy]));
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

  const updateStorage = () => {
    LocalStorage.set(storageKey, strategyList);
  };

  const syncData = () => {
    if (data) setStrategyList(data.list);
    setDiscardable(false);
  };

  const compareData = () => {
    const cookieData: Strategy_T[] = LocalStorage.get(storageKey) || [];

    if (strategyList.length != cookieData?.length) return false;

    let equal = true;
    strategyList.forEach((stateElement) => {
      if (!equal) return;
      const found = cookieData?.find((cookieElement) => stateElement === cookieElement);
      if (!found || found.lastUpdate != stateElement.lastUpdate) equal = false;
    });
    return equal;
  };

  return (
    <div className={styles.strategyContainer}>
      <h3>Current Strategies</h3>
      {discardable && <button onClick={syncData}>Sync</button>}
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
