import React from 'react';

import { useAuth } from '@shared/hooks/Auth';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { Container, ProfileInfo, DropdownMenu } from './styles';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <Container>
      <ProfileInfo>
        <span>{user.name}</span>
        <img src={user.avatar} alt={user.name} />
      </ProfileInfo>
      <DropdownMenu>
        <Link to="/profile">Editar perfil</Link>
        <span>Online</span>
        <div onClick={() => signOut()}>
          <FiLogOut /> Sair do app
        </div>
      </DropdownMenu>
    </Container>
  );
};

export default Profile;
