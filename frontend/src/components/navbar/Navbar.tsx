import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
import { FiLogIn, FiUser } from 'react-icons/fi';
import Brand from './Brand';
import Nav from './Nav';
import './Navbar.scss';

const Navbar = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(['theme']);
  const [switchTheme, setTheme] = useState<string>('dark');
  const [toggled, setToggled] = useState<boolean>(false);
  const [currentHeight, setCurrentHeight] = useState<number>(80);
  const currentWidth = useRef<number>(1200);

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

  useEffect(() => {
    if (window.innerWidth <= 768) {
      currentWidth.current = 768;
    }

    window.addEventListener('resize', windowResized);
    return () => {
      window.removeEventListener('resize', windowResized);
    };
  }, []);

  useEffect(() => {
    const { theme } = cookies;
    const currentTheme = theme ? theme : 'light';
    const prevTheme = theme === 'dark' || !theme ? 'light' : 'dark';

    setTheme(prev => (currentTheme === 'dark' ? 'light' : 'dark'));
    setCookie('theme', currentTheme, { path: '/' });

    document.body.classList.remove(prevTheme);
    document.body.classList.add(currentTheme);
  }, [cookies, setCookie]);

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

  return (
    <header
      className={toggled ? 'box-shadow' : ''}
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
          <button type="button">
            <FiLogIn />
            Login
          </button>
          <button type="button">
            <FiUser />
            Signup
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
