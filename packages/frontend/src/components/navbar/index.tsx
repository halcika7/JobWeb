import React, { FC, useEffect, useRef, useState } from 'react';

// actions
import { logoutUser } from '@pages/Auth/store/actions';

// navigation
import { NavLink } from 'react-router-dom';

// hooks
import { useCookies } from 'react-cookie';
import { useAuthenticated } from '@hooks/useAuthenticated';
import { useThunkDispatch } from '@store/AppThunkDispatch';

// utils
import { SessionStorage } from '@shared/sessionStorage';

// icons
import { FiLogIn, FiUser } from 'react-icons/fi';

// components
import Brand from './Brand';
import Nav from './Nav';

// styles
import './Navbar.scss';

const Navbar: FC = (): JSX.Element => {
  const [cookies, setCookie] = useCookies(['theme', 'accessToken']);
  const [switchTheme, setTheme] = useState<string>('dark');
  const [toggled, setToggled] = useState<boolean>(false);
  const [showShadow, setShowShadow] = useState<boolean>(false);
  const [currentHeight, setCurrentHeight] = useState<number>(80);
  const currentWidth = useRef<number>(1200);
  const scrolled = useRef<boolean>(false);
  const [isAuthenticated] = useAuthenticated();
  const dispatch = useThunkDispatch();

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

  const windowOnScroll = (e: Event) => {
    const w = e.currentTarget as Window;
    if (w.pageYOffset > 30 && !scrolled.current) {
      scrolled.current = true;
      setShowShadow(true);
    }
    if (w.pageYOffset <= 30 && scrolled.current) {
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
      setCurrentHeight(currentHeight - 300);
      setToggled(false);
    } else {
      setCurrentHeight(currentHeight + 300);
      setToggled(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      currentWidth.current = 768;
    }

    window.addEventListener('scroll', windowOnScroll);
    window.addEventListener('resize', windowResized);
    return () => {
      window.removeEventListener('resize', windowResized);
      window.removeEventListener('scroll', windowOnScroll);
    };
  }, []);

  useEffect(() => {
    const { theme } = cookies;
    const currentTheme = theme || 'light';
    const prevTheme = theme === 'dark' || !theme ? 'light' : 'dark';

    setTheme(() => (currentTheme === 'dark' ? 'light' : 'dark'));
    setCookie('theme', currentTheme, { path: '/' });

    document.body.classList.remove(prevTheme);
    document.body.classList.add(currentTheme);
  }, [cookies, setCookie]);

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
        {!isAuthenticated && !SessionStorage.getAuthenticated() ? (
          <div className="buttons">
            <NavLink to="/login">
              <FiLogIn />
              Login
            </NavLink>
            <NavLink to="/register">
              <FiUser />
              Signup
            </NavLink>
          </div>
        ) : (
          <div className="buttons">
            <button type="button" onClick={() => dispatch(logoutUser)}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default React.memo(Navbar);
