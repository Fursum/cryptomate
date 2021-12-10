import randomID from "@libs/functions/randomID";
import { FunctionComponent, useEffect, useState } from "react";
import { ComparisonGroup_T, ComparisonLineData_T, ConditionType } from "@components/automate/AutomateTypes";

import styles from "./actionComponents.module.css";
import ComparisonLine from "./comparisonLine";

interface Props {
  data: ComparisonGroup_T;
  setData: (data: ComparisonGroup_T) => any;
  closeGroup: (id: string) => any;
  isClosing: number;
}

const ComparisonGroup: FunctionComponent<Props> = ({ data, setData, closeGroup, isClosing }) => {
  const [comparisons, setComparisons] = useState<ComparisonLineData_T[]>(data.comparisonLines);
  const [groupType, setGroupType] = useState<ConditionType>(data.type);

  //Send changes to parent
  useEffect(() => {
    if (!isClosing) {
      setData({ comparisonLines: comparisons, id: data.id, type: groupType });
    }
  }, [comparisons, groupType]);

  const updateComparison = (data: ComparisonLineData_T) => {
    setComparisons((oldData) => {
      let index = oldData.findIndex((e) => e.id == data.id);
      let newData = [...oldData];
      newData[index] = data;
      return newData;
    });
  };

  const addLine = () => {
    setComparisons((oldData) => [
      ...oldData,
      {
        id: randomID(),
        dataType: "TBD",
        comparisonType: "<",
        comparisonValue: "",
      },
    ]);
  };

  const removeLine = (id: string) => {
    setComparisons((oldData) => oldData.filter((e) => e.id != id));
  };

  const changeGroupType = () => {
    setGroupType((oldType) => {
      if (oldType == "and") return "or";
      else return "and";
    });
  };

  const DisplayLines = (
    <div
      className={`${styles.comparisonLinesContainer} ${
        comparisons.length > 0 && styles.showBorder
      }`}
    >
      {comparisons.length > 1 && (
        <button className={styles.groupTypeButton} onClick={changeGroupType}>
          {`${groupType == "and" ? "All" : "Any"} of the conditions`}
        </button>
      )}
      {comparisons.map((e) => (
        <ComparisonLine
          key={e.id}
          data={e}
          setData={updateComparison}
          removeLine={removeLine}
          isClosing={isClosing}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.comparisonGroup}>
      <button className={styles.closeGroupButton} onClick={() => closeGroup(data.id)}>Remove group</button>
      {DisplayLines}
      <button className={styles.addLineButton} onClick={addLine}>
        Add Condition
      </button>
    </div>
  );
};

export default ComparisonGroup;
