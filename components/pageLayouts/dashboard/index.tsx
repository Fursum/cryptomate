import Gear from '@public/svg/component/gear'
import { FunctionComponent } from 'react'

import styles from "./dashboard.module.css"

const DashboardLayout:FunctionComponent = () => {
  return (
    <div className={styles.contentWrapper}>
      <div className={styles.content}>
        <Gear />
        <h2>
          This page is under construction.
        </h2>
        <h4>Look up an exchange to see how the configuration works.</h4>
      </div>
    </div>
  )
}

export default DashboardLayout
