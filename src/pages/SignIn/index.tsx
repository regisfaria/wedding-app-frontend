import React, { useRef, useCallback, useState } from 'react';
import { FiUser, FiLock, FiLogIn } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';
import loadingGif from '../../assets/loading.gif';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  Loading,
  AnimationContainer,
  Background,
} from './styles';

interface SignInFormData {
  username: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string().required('Username required'),
          password: Yup.string().required('Please, write a valid password'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          username: data.username,
          password: data.password,
        });

        history.push('/home');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        setIsLoading(false);

        addToast({
          type: 'error',
          title: 'Authentication error',
          description:
            'An error have ocurred when sign-in, please check your credentials.',
        });
      }
    },
    [signIn, addToast, history],
  );

  return (
    <Container>
      <Content>
        {isLoading ? (
          <Loading>
            <img src={loadingGif} alt="loading..." />
          </Loading>
        ) : (
          <AnimationContainer>
            <img src={logoImg} alt="ALWedding" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Login</h1>

              <Input name="username" icon={FiUser} placeholder="Username" />

              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Password"
              />

              <Button type="submit">SignIn</Button>
            </Form>

            <Link to="/signup">
              <FiLogIn />
              Create a new account
            </Link>
          </AnimationContainer>
        )}
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
