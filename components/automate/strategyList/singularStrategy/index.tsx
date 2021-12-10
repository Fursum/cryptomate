import { FunctionComponent, useState } from "react";
import { Strategy_T } from "@components/automate/AutomateTypes";

import styles from "./singularStrategy.module.css";
import ConfigWindow from "./configWindow";

interface Props {
  actionLimit: number;
  strategy: Strategy_T;
  updateStrategy: (strategy: Strategy_T) => any;
  removeStrategy: (id: string) => any;
}

const SingularStrategy: FunctionComponent<Props> = ({
  actionLimit,
  strategy,
  updateStrategy,
  removeStrategy,
}) => {
  const [display, setDisplay] = useState(false);

  return (
    <div>
      <button className={styles.configureStrategy} onClick={() => setDisplay(true)}>
        Configure Strategy
      </button>
      {display && (
        <div className={styles.fullscreenBackground}>
          <ConfigWindow
            strategy={strategy}
            updateStrategy={updateStrategy}
            removeStrategy={removeStrategy}
            actionLimit={actionLimit}
            closeModal={() => setDisplay(false)}
          />
        </div>
      )}
    </div>
  );
};

export default SingularStrategy;
