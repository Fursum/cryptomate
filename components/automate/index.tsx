import { FunctionComponent, useEffect, useState } from "react";
import {
  Action,
  ActionType,
  ComparisonType,
  Conditions,
  CurrencyType,
  DataType,
  AutomateData_T,
} from "./AutomateTypes";
import SingularAction from "./singularAction";

import styles from "./automate.module.css";
import { getServerSideProps } from "pages/search/[...searchParams]";

interface Props {
  actionLimit: number;
}

const Automate: FunctionComponent<Props> = ({ actionLimit }) => {
  const [automateData, setAutomateData] = useState<AutomateData_T[]>([]);
  const [addAction, setAddAction] = useState(false);

  useEffect(() => {
    setAddAction(false);
    if (addAction) {
      if (actionLimit > automateData.length) {
        let newData = automateData;
        newData.push({
          // Questionable id generation
          id:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          actionType: "buy",
          actionValue: "0",
          comparisonType: "<",
          comparisonValue: "",
          currencyType: "local",
          dataType: "price",
        });
        setAutomateData([...newData]);
      }
      else alert("You have reached the order limit")
    }
  }, [addAction]);

  const dataChangeHandler = (data: AutomateData_T, id: string) => {
    setAutomateData((prevData) => {
      const index = prevData.findIndex((e) => e.id == id);
      let newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const removeHandler = (id: string) => {
    setAutomateData((prevData) => {
      let newData = prevData.filter((element) => element.id != id);
      return newData;
    });
  };

  const sendData = () => {
    console.log(automateData);
  };

  return (
    <div className={styles.automateContainer}>
      {automateData.map((element, index) => {
        return (
          <SingularAction
            id={element.id}
            key={element.id}
            data={element}
            setData={dataChangeHandler}
            remove={removeHandler}
          />
        );
      })}
      <div className={styles.bottomContainer}>
        <button className={styles.addOrder} onClick={() => setAddAction(true)}>
          Add Order
        </button>
        <div className={styles.slotInfo}>{automateData.length} / {actionLimit}</div>
        <button className={styles.saveButton} onClick={sendData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Automate;
