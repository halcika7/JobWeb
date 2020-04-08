import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Brand from './Brand';
import Nav from './Nav';
import './Navbar.scss';

const Navbar = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(['theme', 'accessToken']);
  const [switchTheme, setTheme] = useState<string>('dark');
  const [toggled, setToggled] = useState<boolean>(false);
  const [showShadow, setShowShadow] = useState<boolean>(false);
  const [currentHeight, setCurrentHeight] = useState<number>(80);
  const currentWidth = useRef<number>(1200);
  const scrolled = useRef<boolean>(false);

  const windowResized = (e: Event) => {
    const w = e.target as Window;

    if (w.innerWidth <= 768 && currentWidth.current !== 768) {
      currentWidth.current = 768;
    } else if (w.innerWidth > 768 && currentWidth.current === 768) {
      setCurrentHeight(80);
      setToggled(false);
      currentWidth.current = 1200;
    }
  };

  const windowOnScrolll = (e: Event) => {
    const w = e.currentTarget as Window;
    if (w.pageYOffset > 30 && !scrolled.current) {
      scrolled.current = true;
      setShowShadow(true);
    } else if (w.pageYOffset <= 30 && scrolled.current) {
      scrolled.current = false;
      setShowShadow(false);
    }
  };

  const changeTheme = (theme: string) => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    setCookie('theme', theme, { path: '/' });
  };

  const toggleNav = () => {
    if (currentHeight > 80) {
      setCurrentHeight(currentHeight - 290);
      setToggled(false);
    } else {
      setCurrentHeight(currentHeight + 290);
      setToggled(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      currentWidth.current = 768;
    }

    window.addEventListener('scroll', windowOnScrolll);
    window.addEventListener('resize', windowResized);
    return () => {
      window.removeEventListener('resize', windowResized);
      window.removeEventListener('scroll', windowOnScrolll);
    };
  }, []);

  useEffect(() => {
    const { theme } = cookies;
    const currentTheme = theme || 'light';
    const prevTheme = theme === 'dark' || !theme ? 'light' : 'dark';

    setTheme(prev => (currentTheme === 'dark' ? 'light' : 'dark'));
    setCookie('theme', currentTheme, { path: '/' });

    document.body.classList.remove(prevTheme);
    document.body.classList.add(currentTheme);
  }, [cookies, setCookie]);

  useEffect(() => {
    // console.log('globalThis', globalThis.navigator.userAgent);
    // console.log('globalThis', globalThis.navigator.appCodeName);
    // console.log('globalThis', globalThis.navigator.appName);
    // console.log('globalThis', globalThis.navigator.appVersion);
    // console.log('globalThis', globalThis.navigator.vendor);
    // console.log('globalThis', globalThis.navigator.platform);
    // console.log('globalThis', globalThis.navigator.product);
    // console.log('globalThis', globalThis.navigator.userAgent);
    // console.log('globalThis', globalThis.navigator.geolocation.getCurrentPosition(pos => {
    //   console.log(pos)
    // }))
    // console.log('globalThis', globalThis.navigator.geolocation.watchPosition(pos => console.log(pos)))
    // console.log('globalThis', globalThis.navigator)
    // globalThis
  }, []);

  return (
    <header
      className={toggled || showShadow ? 'box-shadow' : ''}
      style={{ height: `${currentHeight}px` }}
    >
      <Brand
        changeTheme={changeTheme}
        switchTheme={switchTheme}
        toggled={toggled}
        toggleNav={toggleNav}
      />
      <div className="collapsible">
        <Nav />
        <div className="buttons">
          <Link to="/login">
            <FiLogIn />
            Login
          </Link>
          <Link to="/register">
            <FiUser />
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
