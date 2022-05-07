import Image from 'next/image';
import styles from '../styles/Layout.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        © {new Date().getFullYear()}, Built with &hearts; by &nbsp; 
        <a
          href="https://blakemoore.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
        Blake Moore
        </a>
      </footer>
  );
}
export default Footer;