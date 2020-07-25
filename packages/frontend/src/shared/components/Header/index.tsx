import React from 'react';
import { NavLink } from 'react-router-dom';

import Notifications from './Notifications';
import Profile from './Profile';

import { Container, HeaderLogo, ProfileAndNotificationSide } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <HeaderLogo>CodeLearn</HeaderLogo>
      <ul>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/aulas">Aulas</NavLink>
        </li>
        <li>
          <NavLink to="/forum">Fórum</NavLink>
        </li>
        <li>
          <NavLink to="/bonus">Bônus</NavLink>
        </li>
      </ul>
      <ProfileAndNotificationSide>
        <Notifications />
        <Profile />
      </ProfileAndNotificationSide>
    </Container>
  );
};

export default Header;
