import { Order_T, Strategy_T } from "@components/automate/AutomateTypes";
import randomID from "@libs/functions/randomID";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import SingularAction from "./singularAction";
import styles from "./singularStrategy.module.css";

interface Props {
  strategy: Strategy_T;
  closeModal: () => any;
  updateStrategy: (data: Strategy_T) => any;
  removeStrategy: (id: string) => any;
  actionLimit?: number;
}

const ConfigWindow: FunctionComponent<Props> = ({
  strategy,
  closeModal,
  removeStrategy,
  updateStrategy,
  actionLimit = 5,
}) => {
  const [orderList, setOrderList] = useState(strategy.orderList);
  const [title, setTitle] = useState(strategy.title);
  const [buyCap, setBuyCap] = useState(strategy.totalBuyCap);

  //Close modal handler
  const componentRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e: Event) {
      //@ts-ignore
      if (!componentRef.current?.contains(e.target)) closeModal();
    }
    function handleESC(e: KeyboardEvent) {
      if(e.code === "Escape")
        closeModal()
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keyup", handleESC)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keyup", handleESC)
    };
  }, [componentRef]);

  useEffect(() => {
    updateStrategy({
      ...strategy,
      title: title,
      orderList: orderList,
      totalBuyCap: buyCap,
      lastUpdate: new Date(Date.now()),
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
    setOrderList((prevData) => {
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

  const Orders = orderList.map((e) => {
    return (
      <SingularAction key={e.id} data={e} id={e.id} remove={removeFromList} setData={updateList} />
    );
  });

  return (
    <div ref={componentRef} className={styles.configWindowBackground}>
      <input
        className={styles.titleInput}
        type="text"
        maxLength={32}
        minLength={2}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      {Orders}
      <div className={styles.actionBar}>
        <button className={styles.removeStrategy} onClick={() => removeStrategy(strategy.id)}>
          Remove Strategy
        </button>
        <button className={styles.addOrder} onClick={addAction}>
          Add Action
        </button>
      </div>
      <span>Last update: {strategy.lastUpdate.toLocaleString()}</span>
    </div>
  );
};

export default ConfigWindow;
