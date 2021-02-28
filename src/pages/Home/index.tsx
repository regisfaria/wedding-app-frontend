import React, { useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import AppHeader from '../../components/AppHeader';

import api from '../../services/api';
import Post from './components/Post';

import { Container, Content, PostFeed } from './styles';

interface AuthorData {
  imageUrl: string;
  name: string;
}

interface Comment {
  content: string;
  identifier: string;
  imageUrl: string;
  authorName: string;
}

interface PostData {
  _id: {
    $oid: string;
  };
  imageUrl: string;
  authorData: AuthorData;
  description: string;
  title: string;
  comments: Comment[];
  active: boolean;
  likes: number;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/posts/1').then(response => {
      setPosts(response.data.data);
    });
  }, []);

  return (
    <Container>
      <AppHeader />

      <Content>
        {posts.length && (
          <PostFeed>
            {posts.map(post => (
              <Post key={post._id.$oid} post={post} />
            ))}
          </PostFeed>
        )}
      </Content>
    </Container>
  );
};

export default Home;