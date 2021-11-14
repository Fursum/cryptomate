import { FunctionComponent, useEffect, useRef, useState } from "react";
import { DataType } from "../AutomateTypes";
import styles from "./selectionComponents.module.css";

interface Props {
  state: any;
  setState: any;
  options: string[];
  wide: boolean;
}

const DropdownSelect: FunctionComponent<Props> = ({ state, setState, options, wide }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const componentRef = useRef(null);

  //Close the dropdown on clicking anywhere
  const handleClickOutside = (e: Event) => {
    // @ts-ignore: Object is possibly 'null'.
    if (showDropdown && !componentRef.current.contains(e.target)) setShowDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const dropdown = (
    <div className={styles.dropdownContainer}>
      {options.map((element) => {
        if (element != state)
          return (
            <div
              className={styles.dropdownOption}
              key={element}
              onClick={() => setState(element.replace(" ", ""))}
            >
              <span>{element}</span>
            </div>
          );
        else return "";
      })}
    </div>
  );

  const className = `${wide ? styles.wideDropdownButton : styles.smallDropdownButton} ${
    showDropdown && styles.selected
  }`;
  return (
    <div className={className} onClick={() => setShowDropdown(!showDropdown)} ref={componentRef}>
      <span>{state}</span>
      {showDropdown && dropdown}
    </div>
  );
};

export default DropdownSelect;
