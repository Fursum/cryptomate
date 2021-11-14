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

  const dataChangeHandler = (data: AutomateData_T, index: number) => {
    let newData = [...automateData];
    newData[index] = data;
    setAutomateData(newData);
  };

  const removeHandler = (index: number) => {
    console.log("removing " + (index + 1));
    setAutomateData((prevData) => {
      let newData = [...prevData];
      newData.splice(index, 1);
      return newData;
    });
  };

  return (
    <>
      {automateData.map((element, index) => {
        return (
          <SingularAction
            id={index}
            key={index}
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
