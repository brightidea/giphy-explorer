import Navbar from './navbar';
import Footer from './footer';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div id="root" className={styles.wrapper}>
      <Navbar />
      <main>{children}</main>
      <Footer className={styles.footer} />
    </div>
  )
}
export default Layout;