import React, { useRef, useCallback, ChangeEvent } from 'react';
import { FormHandles } from '@unform/core';
import { FiLock, FiMail, FiUser, FiSave, FiCamera } from 'react-icons/fi';

import DefaultLayout from '@gComponents/_Layout/Default';
import Input from '@gComponents/Input';

import { useAuth } from '@shared/hooks/Auth';

import api from '@shared/services/api';
import { Container, EditProfile, AvatarInput, EditButton } from './styles';

const Profile: React.FC = () => {
  const formRef = useRef({} as FormHandles);
  const { user, setUser } = useAuth();

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        const response = await api.patch(`avatar/update`, data);
        setUser(response.data);
      }
    },
    [setUser],
  );

  return (
    <DefaultLayout>
      <Container>
        <h1>Profile</h1>

        <EditProfile
          ref={formRef}
          onSubmit={data => console.log('Submited', data)}
          initialData={{ name: user.name, email: user.email }}
        >
          <section>
            <header>Edite seu avatar</header>

            <AvatarInput>
              <img src={user.avatarURL} alt={user.name} />
              <label htmlFor="avatar">
                <FiCamera />

                <input type="file" id="avatar" onChange={handleAvatarChange} />
              </label>
            </AvatarInput>
          </section>
          <section>
            <header>Edite suas informações pessoais</header>

            <Input icon={FiUser} name="name" label="Nome" />
            <Input icon={FiMail} name="email" label="E-mail" />
          </section>
          <section>
            <Input
              type="password"
              icon={FiLock}
              name="oldPassword"
              label="Senha atual"
            />
            <Input
              type="password"
              icon={FiLock}
              name="password"
              label="Nova senha"
            />
            <Input
              type="password"
              icon={FiLock}
              name="confirmPassword"
              label="Confirmação de nova senha"
            />
          </section>
          <section>
            <EditButton>
              <FiSave /> Salvar
            </EditButton>
          </section>
        </EditProfile>
      </Container>
    </DefaultLayout>
  );
};

export default Profile;
