import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiUser, FiLock, FiFileText } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimatedContent, Background } from './styles';

interface SignUpFormData {
  name: string;
  username: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name required'),
          username: Yup.string().required('Username required'),
          password: Yup.string().min(6, 'Password must have at least 6 digits'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], "Password don't match")
            .required("Password don't match"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, username, password } = data;

        await api.post('/users', {
          name,
          username,
          privileges: 'user',
          password,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Registration completed!',
          description: 'Now you can login!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Registration Error',
          description:
            'An error have occured in registration. Try again, please.',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />

      <Content>
        <AnimatedContent>
          <img src={logoImg} alt="ALWedding" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Account data</h1>

            <Input name="name" icon={FiUser} type="text" placeholder="Name" />
            <Input
              name="username"
              icon={FiFileText}
              type="text"
              placeholder="Username"
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Password"
            />
            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirm password"
            />

            <Button type="submit">SignUp</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Return
          </Link>
        </AnimatedContent>
      </Content>
    </Container>
  );
};

export default SignUp;
