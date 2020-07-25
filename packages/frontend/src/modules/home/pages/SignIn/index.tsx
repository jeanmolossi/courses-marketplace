import React, { useCallback, useRef } from 'react';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';

import Input from '@globalComponents/Input';

import getValidationsErrors from '@shared/utils/getValidationErrors';

import { useAuth } from '@hooks/Auth';
import { useToast } from '@shared/hooks/Toasts';

import {
  Container,
  LeftSideOfSignIn,
  MiddleContents,
  Button,
  RightSideOfSignIn,
} from './styles';

const SignIn: React.FC = () => {
  const formRef = useRef({} as FormHandles);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async ({ email, password }) => {
      try {
        formRef.current.setErrors({});

        const schema = yup.object().shape({
          email: yup
            .string()
            .email('Preencha um e-mail válido')
            .required('Preechimento do e-mail é obrigatório'),
          password: yup.string().required('Preencher a senha é obrigatório'),
        });

        await schema.validate({ email, password }, { abortEarly: false });

        await signIn({
          email,
          password,
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
    },
    [signIn, addToast],
  );

  return (
    <Container>
      <LeftSideOfSignIn>
        <MiddleContents>
          <h1>
            Bem vindo, <br />
            Jovem Padawan!
          </h1>

          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={{ email: 'jean@email.com', password: '12345' }}
          >
            <Input
              name="email"
              label="E-mail"
              icon={FiMail}
              placeholder="Digite seu e-mail"
            />

            <Input
              name="password"
              label="Senha"
              icon={FiLock}
              placeholder="Digite sua senha"
              type="password"
            />

            <Button type="submit">
              <FiLogIn /> Acessar
            </Button>
          </Form>

          <Link to="/register">
            Não possui conta ? <span>Cadastre-se</span>
          </Link>
        </MiddleContents>
      </LeftSideOfSignIn>

      <RightSideOfSignIn />
    </Container>
  );
};

export default SignIn;
