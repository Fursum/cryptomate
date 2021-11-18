import { FunctionComponent, useEffect, useState } from "react";
import { ComparisonLineData_T, ComparisonType, DataType } from "../AutomateTypes";
import DropdownSelect from "../selectionComponents/dropdownSelect";

import styles from "./actionComponents.module.css";

interface Props {
  data: ComparisonLineData_T;
  setData: (data: ComparisonLineData_T) => any;
  removeLine: (id: string) => any;
  isClosing: number;
}

const ComparisonLine: FunctionComponent<Props> = ({ data, setData, removeLine, isClosing }) => {
  const [dataType, setDataType] = useState<DataType>(data.dataType);
  const [comparisonType, setComparisonType] = useState<ComparisonType>(data.comparisonType);
  const [comparisonValue, setComparisonValue] = useState(data.comparisonValue);

  const dataTypeOptions: DataType[] = ["price", "marketValue", "TBD"];
  const comparisonOptions: ComparisonType[] = ["<", "<=", "=", ">", ">="];

  //Handles data change
  useEffect(() => {
    if (!isClosing)
      setData({
        id: data.id,
        dataType: dataType,
        comparisonType: comparisonType,
        comparisonValue: comparisonValue,
      });
  }, [dataType, comparisonType, comparisonValue]);

  return (
    <div className={styles.comparisonLine}>
      <button className={styles.removeLineButton} onClick={() => removeLine(data.id)}>X</button>

      <DropdownSelect
        state={dataType}
        setState={setDataType}
        options={dataTypeOptions}
        wide={true}
      />
      <DropdownSelect
        state={comparisonType}
        setState={setComparisonType}
        options={comparisonOptions}
        wide={false}
      />
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
  );
};

export default ComparisonLine;
