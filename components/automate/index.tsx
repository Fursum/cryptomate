import { FunctionComponent, useEffect, useState } from "react";
import { AutomateData_T } from "./AutomateTypes";
import SingularAction from "./actionComponents/singularAction";
import randomID from "@libs/functions/randomID";

import styles from "./automate.module.css";

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
          id: randomID(),
          actionData: {
            actionType: "buy",
            actionValue: "",
            currencyType: "local",
          },
          comparisonGroups: [],
          conditionBetweenGroups: "and",
        });
        setAutomateData([...newData]);
      } else alert("You have reached the order limit");
    }
  }, [addAction]);

  const updateData = (data: AutomateData_T) => {
    setAutomateData((prevData) => {
      const index = prevData.findIndex((e) => e.id == data.id);
      let newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const removeData = (id: string) => {
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
      {automateData.map((element) => {
        return (
          <SingularAction
            id={element.id}
            key={element.id}
            data={element}
            setData={updateData}
            remove={removeData}
          />
        );
      })}
      <div className={styles.bottomContainer}>
        <button className={styles.addOrder} onClick={() => setAddAction(true)}>
          Add Order
        </button>
        <div className={styles.slotInfo}>
          {automateData.length} / {actionLimit}
        </div>
        <button className={styles.saveButton} onClick={sendData}>
          Save
        </button>
      </div>
    </div>
  );
};

export default Automate;