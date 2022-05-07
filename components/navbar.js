import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [logoSize, setLogoSize] = useState('');

  const ResizeHeaderOnScroll = (e) => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop,
    shrinkOn = 100,
    headerEl = document.getElementById("logo");

    if (distanceY > shrinkOn) {
      headerEl.classList.add("smallLogo");
      setLogoSize('small')
    } else {
      headerEl.classList.remove("smallLogo");
      setLogoSize('')
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', ResizeHeaderOnScroll);
    return () => window.removeEventListener('scroll', ResizeHeaderOnScroll);
  }, []);
  const logoWidth = logoSize === 'small' ? '120px' : '190px';
  const logoHeight = logoSize === 'small' ? '64px' : '101px';

  return (
    <nav className={styles.navbar}>
      <div className="w-full flex justify-center items-center flex-shrink-0 text-white mr-20">
        <Link href="/">
          <a>
            <img src="/giphy-explorer-logo.png" id="logo" alt="Giphy Explorer Logo" className={styles.logo} />
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;


