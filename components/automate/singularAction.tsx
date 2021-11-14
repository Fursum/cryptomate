import { FunctionComponent, useEffect, useState } from "react";
import { ActionType, ComparisonType, CurrencyType, DataType } from "./AutomateTypes";
import { AddActionButton } from "./selectionComponents";
import DropdownSelect from "./selectionComponents/dropdownSelect";
import { AutomateData_T } from ".";

import styles from "./automate.module.css";

interface Props {
  id: string;
  data: AutomateData_T;
  setData: (data: AutomateData_T, index: string) => any;
  remove: (index: string) => any;
}

const SingularAction: FunctionComponent<Props> = ({ id, data, setData, remove }) => {
  const [dataType, setDataType] = useState<DataType>(data.dataType);
  const [comparisonType, setComparisonType] = useState<ComparisonType>(data.comparisonType);
  const [comparisonValue, setComparisonValue] = useState(data.comparisonValue);
  const [actionType, setActionType] = useState<ActionType>(data.actionType);
  const [currencyType, setCurrencyType] = useState<CurrencyType>(data.currencyType);
  const [actionValue, setActionValue] = useState(data.actionValue);

  const [isClosing, setIsClosing] = useState(0);
  //Remove the element after animation
  //Using numbers to check, to run this only once
  useEffect(() => {
    if(isClosing == 1){
      setIsClosing(0);
      setTimeout(() => {
        remove(id);
      }, 100);}
  }, [isClosing]);

  //Handles data change
  useEffect(() => {
    if (!isClosing)
      setData(
        {
          id: id,
          dataType: dataType,
          comparisonType: comparisonType,
          actionType: actionType,
          actionValue: actionValue,
          comparisonValue: comparisonValue,
          currencyType: currencyType,
        },
        id
      );
  }, [dataType, comparisonType, comparisonValue, actionType, actionValue, currencyType]);

  const dataTypeOptions: DataType[] = ["price", "marketValue", "TBD"];
  const comparisonOptions: ComparisonType[] = ["<", "<=", "=", ">", ">="];
  const currencyOptions: CurrencyType[] = ["$", "local"];
  const actionOptions: ActionType[] = ["buy", "sell"];

  return (
    <div className={`${styles.actionContainer} ${isClosing && styles.closing}`}>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsClosing(isClosing + 1);
        }}
      >
        X
      </button>
      <div className={styles.comparisonLine}>
        <span>When</span>
        <DropdownSelect
          state={dataType}
          setState={setDataType}
          options={dataTypeOptions}
          wide={true}
        />
        <span> is </span>
        <DropdownSelect
          state={comparisonType}
          setState={setComparisonType}
          options={comparisonOptions}
          wide={false}
        />
        <span> than </span>
        <input
          className={styles.valueInput}
          value={comparisonValue}
          maxLength={12}
          type="number"
          placeholder="0"
          onChange={(event) => setComparisonValue(event.target.value)}
          required
        />
      </div>
      <div className={styles.actionLine}>
        <DropdownSelect
          state={actionType}
          setState={setActionType}
          options={actionOptions}
          wide={false}
        />
        <DropdownSelect
          state={currencyType}
          setState={setCurrencyType}
          options={currencyOptions}
          wide={false}
        />
        <input
          className={styles.actionInput}
          value={actionValue}
          maxLength={12}
          type="number"
          placeholder="0"
          onChange={(event) => setActionValue(event.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default SingularAction;
