import { FunctionComponent, useEffect, useState } from "react";
import { ActionData_T, ActionType, CurrencyType } from "../AutomateTypes";
import DropdownSelect from "../selectionComponents/dropdownSelect";

import styles from "./actionComponents.module.css"

interface Props {
  data: ActionData_T;
  setData: (data: ActionData_T) => any;
  isClosing: number
}

const ActionLine: FunctionComponent<Props> = ({ data, setData, isClosing }) => {
  const [actionType, setActionType] = useState<ActionType>(data.actionType);
  const [currencyType, setCurrencyType] = useState<CurrencyType>(data.currencyType);
  const [actionValue, setActionValue] = useState(data.actionValue);

  const currencyOptions: CurrencyType[] = ["$", "local"];
  const actionOptions: ActionType[] = ["buy", "sell"];

  //Handles data change
  useEffect(() => {
    if (!isClosing)
      setData(
        {
          actionType: actionType,
          actionValue: actionValue,
          currencyType: currencyType,
        },
      );
  }, [actionType, actionValue, currencyType]);

  return (
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
  );
};

export default ActionLine;
