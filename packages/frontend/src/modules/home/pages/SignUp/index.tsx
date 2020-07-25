import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FiMail, FiLock, FiUser, FiPlusSquare } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { FormHandles } from '@unform/core';

import Input from '@gComponents/Input';

import { useToast } from '@shared/hooks/Toasts';

import api from '@shared/services/api';
import getValidationsErrors from '@shared/utils/getValidationErrors';

import {
  Container,
  LeftSideOfSignUp,
  MiddleContents,
  Button,
  RightSideOfSignUp,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const history = useHistory();
  const formRef = useRef<FormHandles>({} as FormHandles);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ name, email, password, confirmPassword }: SignUpFormData) => {
      try {
        formRef.current.setErrors({});

        const schema = yup.object().shape({
          name: yup.string().required('Nome é obrigatório'),
          email: yup
            .string()
            .email('Preencha um e-mail válido')
            .required('Preechimento do e-mail é obrigatório'),
          password: yup.string().required('Preencher a senha é obrigatório'),
          confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Senhas não conferem')
            .required('Confirme a senha'),
        });

        await schema.validate(
          { name, email, password, confirmPassword },
          { abortEarly: false },
        );

        const avatarName = String(name).replace(/( )/gim, '');

        await api.post(`users`, {
          name,
          email,
          password,
          avatar: `https://api.adorable.io/avatars/99/${avatarName}.png`,
        });

        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Seu cadastro foi confirmado, acesse a plataforma agora',
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          const errors = getValidationsErrors(error);
          formRef.current.setErrors(errors);

          return;
        }

        addToast({
          title: 'Ocorreu um erro',
          type: 'error',
          description: 'Verifique seus dados ou tente novamente mais tarde',
        });
      }

      history.push('/');
    },
    [history, addToast],
  );

  const initialData = {
    name: 'Outro jean teste',
    email: 'email@teste.com.br',
    password: '123456',
    confirmPassword: '12345',
  };

  return (
    <Container>
      <LeftSideOfSignUp>
        <MiddleContents>
          <h1>
            Bem vindo, <br />
            <small>Jovem Padawan, faça seu cadastro</small>
          </h1>

          <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
            <Input
              name="name"
              forId="nome"
              label="Nome"
              icon={FiUser}
              placeholder="Digite seu nome"
            />

            <Input
              name="email"
              forId="email"
              label="E-mail"
              icon={FiMail}
              placeholder="Digite seu e-mail"
            />

            <Input
              name="password"
              forId="senha"
              label="Senha"
              icon={FiLock}
              type="password"
              placeholder="Digite sua senha"
            />
            <Input
              name="confirmPassword"
              forId="confirmPassword"
              label="Confirmação de senha"
              icon={FiLock}
              type="password"
              placeholder="Digite novamente a senha"
            />

            <Button type="submit">
              <FiPlusSquare /> Registrar
            </Button>
          </Form>

          <Link to="/">
            Já possui conta ? <span>Faça seu acesso</span>
          </Link>
        </MiddleContents>
      </LeftSideOfSignUp>

      <RightSideOfSignUp />
    </Container>
  );
};

export default SignUp;
