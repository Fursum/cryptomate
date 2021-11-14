import { FunctionComponent, useEffect, useState } from "react";
import {
  Action,
  ActionType,
  ComparisonType,
  Conditions,
  CurrencyType,
  DataType,
} from "./AutomateTypes";
import SingularAction from "./singularAction";

export type AutomateData_T = {
  id: string;
  dataType: DataType;
  comparisonType: ComparisonType;
  comparisonValue: string; //number input
  actionType: ActionType;
  actionValue: string; //number input
  currencyType: CurrencyType;
};

const Automate: FunctionComponent = () => {
  const [automateData, setAutomateData] = useState<AutomateData_T[]>([]);
  const [addAction, setAddAction] = useState(false);

  useEffect(() => {
    if (addAction) {
      let newData = automateData;
      newData.push({
        // Questionable id generation
        id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        actionType: "buy",
        actionValue: "0",
        comparisonType: "<",
        comparisonValue: "",
        currencyType: "local",
        dataType: "price",
      });
      setAutomateData([...newData]);
      setAddAction(false);
    }
  }, [addAction]);

  const dataChangeHandler = (data: AutomateData_T, id: string) => {
    setAutomateData((prevData) => {
      const index = prevData.findIndex(e =>  e.id == id)
      let newData = [...prevData];
      newData[index] = data;
      return newData;
    });
  };

  const removeHandler = (id: string) => {
    setAutomateData((prevData) => {
      let newData = prevData.filter(element => element.id != id);
      return newData;
    });
  };

  return (
    <>
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
      <button onClick={() => setAddAction(true)}>Add Action</button>
    </>
  );
};

export default Automate;
