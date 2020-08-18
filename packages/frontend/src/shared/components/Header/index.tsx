import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiX, FiMenu } from 'react-icons/fi';

import Notifications from './Notifications';
import Profile from './Profile';

import {
  Container,
  CloseButton,
  OpenMenuButton,
  HeaderLogo,
  ProfileAndNotificationSide,
} from './styles';

const Header: React.FC = () => {
  const [closed, setClosed] = useState(true);

  return (
    <Container closed={Number(closed)}>
      <CloseButton onClick={() => setClosed(!closed)}>
        <FiX />
      </CloseButton>
      <OpenMenuButton onClick={() => setClosed(false)}>
        <FiMenu />
      </OpenMenuButton>
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
