import { FunctionComponent, useEffect, useState } from "react";
import SingularAction from "./singularAction";
import { Order_T, Strategy_T } from "@components/automate/AutomateTypes";
import randomID from "@libs/functions/randomID";

import styles from "./singularStrategy.module.css";

interface Props {
  actionLimit: number;
  strategy: Strategy_T;
  updateStrategy: (strategy: Strategy_T) => any;
  removeStrategy: (id:string) => any;
}

const SingularStrategy: FunctionComponent<Props> = ({ actionLimit, strategy, updateStrategy }) => {
  const [orderList, setOrderList] = useState(strategy.orderList);
  const [title, setTitle] = useState(strategy.title);
  const [buyCap, setBuyCap] = useState(strategy.totalBuyCap);

  //Send updates to parent
  useEffect(() => {
    updateStrategy({
      ...strategy,
      title: title,
      orderList: orderList,
      totalBuyCap: buyCap,
    });
  }, [orderList, title, buyCap]);

  const addAction = () => {
    if (actionLimit > orderList.length) {
      setOrderList((oldList) => [
        ...oldList,
        {
          id: randomID(),
          actionData: {
            actionType: "buy",
            actionValue: "",
            currencyType: "local",
          },
          comparisonGroups: [],
          conditionBetweenGroups: "and",
        },
      ]);
    } else alert("You have reached the order limit");
  };

  const updateList = (data: Order_T) => {
    setOrderList(prevData => {
      const index = orderList.findIndex((e) => e.id == data.id);
      let newOrders = [...prevData];
      newOrders[index] = data;
      return newOrders;
    });
  };

  const removeFromList = (id: string) => {
    setOrderList((prevData) => {
      let newData = prevData.filter((element) => element.id != id);
      return newData;
    });
  };

  const sendData = () => {
    console.log(orderList);
  };

  return (
    <div className={styles.automateContainer}>
      {orderList.map((element) => {
        return (
          <SingularAction
            id={element.id}
            key={element.id}
            data={element}
            setData={updateList}
            remove={removeFromList}
          />
        );
      })}
      <div className={styles.bottomContainer}>
        <button className={styles.addOrder} onClick={() => addAction}>
          Add Order
        </button>
        <div className={styles.slotInfo}>
          {orderList.length} / {actionLimit}
        </div>
        <button className={styles.saveButton} onClick={sendData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default SingularStrategy;
