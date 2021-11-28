import { FunctionComponent } from "react"
import styles from "./coinHistory.module.css"


interface Props {
  active: string;
  setState: (state: string) => any;
}

const IntervalButtons:FunctionComponent<Props> = ({active, setState}) => {

  const possibleStates = ["5m", "15m", "1h", "12h", "1w", "1M"];

  return (
    <div className={styles.buttonDeck}>
      {possibleStates.reverse().map(e => {
        if(e == active)
          return <button key={e} className={styles.buttonActive}>
            {e}
          </button>
        return <button key={e} className={styles.buttonInactive} onClick={() => setState(e)}>
          {e}
        </button>
      })}
    </div>
  )
}

export default IntervalButtons
