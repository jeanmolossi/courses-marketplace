import React, { useMemo } from 'react';

import { useAuth } from '@shared/hooks/Auth';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { Container, ProfileInfo, DropdownMenu } from './styles';

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();

  const status = useMemo(() => user.status || 'Offline', [user.status]);

  return (
    <Container>
      <ProfileInfo>
        <span>{user.name}</span>
        <img src={user.avatarURL} alt={user.name} />
      </ProfileInfo>
      <DropdownMenu connectionStatus={status}>
        <Link to="/profile">Editar perfil</Link>
        <span>{status}</span>
        <div onClick={() => signOut()}>
          <FiLogOut /> Sair do app
        </div>
      </DropdownMenu>
    </Container>
  );
};

export default Profile;
