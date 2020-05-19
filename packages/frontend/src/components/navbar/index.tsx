import React, { FC, useEffect, useRef, useState } from 'react';

// actions
import { logoutUser } from '@containers/Auth/store/actions';

// navigation
import NavLink from 'next/link';

// hooks
import { useAuthenticated } from '@hooks/useAuthenticated';
import { useThunkDispatch } from '@store/AppThunkDispatch';

// icons
import { FiLogIn, FiUser } from 'react-icons/fi';

// components
import Brand from './Brand';
import Nav from './Nav';

import { Header, Collapsible, Button, Navigation } from './styled';

const Navbar: FC = (): JSX.Element => {
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

  return (
    <Header
      as="header"
      shadow={toggled || showShadow}
      style={{ height: `${currentHeight}px` }}
    >
      <Brand toggled={toggled} toggleNav={toggleNav} />
      <Collapsible>
        <Nav />
        {!isAuthenticated ? (
          <Navigation>
            <NavLink href="/login" passHref>
              <Button as="a">
                <FiLogIn />
                Login
              </Button>
            </NavLink>
            <NavLink href="/register" passHref>
              <Button as="a">
                <FiUser />
                Signup
              </Button>
            </NavLink>
          </Navigation>
        ) : (
          <Navigation>
            <Button type="button" onClick={() => dispatch(logoutUser)}>
              Logout
            </Button>
          </Navigation>
        )}
      </Collapsible>
    </Header>
  );
};

export default React.memo(Navbar);
