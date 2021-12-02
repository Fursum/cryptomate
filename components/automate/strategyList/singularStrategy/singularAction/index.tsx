import randomID from "@libs/functions/randomID";
import { FunctionComponent, useEffect, useState } from "react";
import {
  AutomateData_T,
  ActionData_T,
  ComparisonGroup_T,
  ComparisonType,
  ConditionType,
} from "@components/automate/AutomateTypes";

import styles from "./actionComponents.module.css";
import ActionLine from "./actionLine";
import ComparisonGroup from "./comparisonGroup";

interface Props {
  id: string;
  data: AutomateData_T;
  setData: (data: AutomateData_T) => any;
  remove: (index: string) => any;
}

const SingularAction: FunctionComponent<Props> = ({ id, data, setData, remove }) => {
  const [comparisonGroups, setComparisonGroups] = useState<ComparisonGroup_T[]>(
    data.comparisonGroups
  );
  const [groupType, setGroupType] = useState<ConditionType>(data.conditionBetweenGroups);
  const [actionLineData, setActionLineData] = useState<ActionData_T>(data.actionData);
  const [isClosing, setIsClosing] = useState(0);

  //Remove the action after animation
  //Using numbers to check, to run this only once
  useEffect(() => {
    if (isClosing == 1) {
      setIsClosing(2);
      setTimeout(() => {
        remove(id);
      }, 500);
    }
  }, [isClosing]);

  //Send changes to parent
  useEffect(() => {
    if (!isClosing)
      setData({
        id: id,
        actionData: actionLineData,
        comparisonGroups: comparisonGroups,
        conditionBetweenGroups: groupType,
      });
  }, [actionLineData, comparisonGroups, groupType]);

  const updateGroup = (data: ComparisonGroup_T) => {
    setComparisonGroups((oldData) => {
      let newData = [...oldData];
      const index = newData.findIndex((e) => e.id == data.id);
      newData[index] = data;
      return newData;
    });
  };

  const addGroup = () => {
    const newGroup: ComparisonGroup_T = {
      comparisonLines: [],
      id: randomID(),
      type: "and",
    };
    setComparisonGroups((data) => [...data, newGroup]);
  };

  const closeGroup = (id: string) => {
    setComparisonGroups((oldData) => oldData.filter((e) => e.id != id));
  };

  const changeGroupType = () => {
    setGroupType((oldType) => (oldType == "and" ? "or" : "and"));
  };

  const DisplayGroups = comparisonGroups.map((e, index) => {
    return (
      <ComparisonGroup
        key={e.id}
        data={e}
        setData={updateGroup}
        isClosing={isClosing}
        closeGroup={closeGroup}
      />
    );
  });

  const GroupComparisonButton = (
    <button className={styles.actionGroupTypeButton} onClick={changeGroupType}>
      {`${groupType == "and" ? "All" : "Any"} of the groups`}
    </button>
  );

  const AddGroupButton = (
    <button className={styles.addGroupButton} onClick={addGroup}>
      Add Group
    </button>
  );

  const CloseAction = (
    <div
      className={styles.closeActionButton}
      onClick={() => {
        setIsClosing(isClosing + 1);
      }}
    >
      <span>-</span>
    </div>
  );

  return (
    <div className={`${styles.actionContainer} ${isClosing && styles.closing}`}>
      {CloseAction}
      {comparisonGroups.length > 1 && GroupComparisonButton}
      <div className={styles.comparisonGroupContainer}>{DisplayGroups}</div>
      {AddGroupButton}

      <ActionLine data={actionLineData} setData={setActionLineData} isClosing={isClosing} />
    </div>
  );
};

export default SingularAction;
