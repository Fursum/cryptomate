import { FunctionComponent } from "react";
import { Strategy_T } from "../AutomateTypes";
import SingularStrategy from "./singularStrategy";

import styles from "./strategyList.module.css";

interface Props {
  strategyList: Strategy_T[];
  updateStrategy: (strategy: Strategy_T) => any;
  removeStrategy: (id: string) => any;
  createStrategy: () => any;
}

const ListDisplay: FunctionComponent<Props> = ({
  strategyList,
  updateStrategy,
  removeStrategy,
  createStrategy
}) => {
  if (!strategyList) return <div className="error">You have no active strategies.</div>;

  const StrategyList = strategyList?.map((strategy: Strategy_T) => {
    return (
      <div key={strategy.id} className={styles.strategyContainer}>
        <span className={styles.title}>{strategy.title}</span>
        <SingularStrategy
          actionLimit={5}
          strategy={strategy}
          updateStrategy={updateStrategy}
          removeStrategy={removeStrategy}
        />
      </div>
    );
  });

  return (
    <div className={styles.strategyList}>
      {StrategyList}
      <button className={styles.newStrategy} onClick={createStrategy}>
        Create Strategy
      </button>
    </div>
  );
};

export default ListDisplay;
