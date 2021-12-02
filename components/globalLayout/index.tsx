import { FunctionComponent } from "react"
import Header from "./header"
import styles from "./layout.module.css"
import { useSession } from "node_modules/next-auth/client"

const Layout:FunctionComponent = ({children}) => {
  
  const [session] = useSession();

  return (
    <>
      <Header/>
      <div className={styles.mainWrapper}>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout;
