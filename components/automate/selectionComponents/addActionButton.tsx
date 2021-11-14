import { FunctionComponent, useState } from "react";
import { Action, ActionType } from "../AutomateTypes";

interface Props {
  setActionType: any;
}

const AddActionButton: FunctionComponent<Props> = ({ setActionType }) => {
  const [clickedState, setClickedState] = useState(false);
  const displayButtons = () => {
    setClickedState(true);
  };

  return clickedState ? (
    <div className={""}>
      <button className={""} onClick={() => setActionType("buy")}>
        BUY
      </button>
      <button className={""} onClick={() => setActionType("sell")}>
        SELL
      </button>
    </div>
  ) : (
    <button className={""} onClick={displayButtons}>
      Add Action
    </button>
  );
};

export default AddActionButton;
