import React, { useRef, useCallback, useState, ChangeEvent } from 'react';
import { FiImage } from 'react-icons/fi';
import { MdTitle, MdDescription } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/toast';
import loadingGif from '../../assets/loading.gif';

import AppHeader from '../../components/AppHeader';
import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  Loading,
  AnimationContainer,
  Background,
} from './styles';

interface NewPostFormData {
  image: File;
  description: string;
  title: string;
}

const NewPost: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const history = useHistory();

  const handleImageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        formData.append('image', event.target.files[0]);
      }
    },
    [formData],
  );

  const handleSubmit = useCallback(
    async (data: NewPostFormData) => {
      setIsLoading(true);
      try {
        formRef.current?.setErrors({});

        formData.append('title', data.title);
        formData.append('description', data.description);

        await api.post('/posts', formData);

        addToast({
          type: 'success',
          title: 'Post Created!',
          description: 'Your post will be reviewed and then approved.',
        });

        history.push('/home');
      } catch (error) {
        console.log(error);

        addToast({
          type: 'error',
          title: 'Cant create the post',
          description: 'An error have ocurred, try again later.',
        });
        setIsLoading(false);
      }
    },
    [addToast, history, formData],
  );

  return (
    <>
      <AppHeader />
      <Container>
        <Content>
          {isLoading ? (
            <Loading>
              <img src={loadingGif} alt="loading" />
            </Loading>
          ) : (
            <AnimationContainer>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Create a new Post</h1>

                <Input
                  name="image"
                  type="file"
                  icon={FiImage}
                  placeholder="Post image"
                  onChange={handleImageChange}
                />

                <Input name="title" icon={MdTitle} placeholder="Title" />

                <Input
                  name="description"
                  icon={MdDescription}
                  placeholder="Description"
                />

                <Button type="submit">Create</Button>
              </Form>
            </AnimationContainer>
          )}
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default NewPost;
