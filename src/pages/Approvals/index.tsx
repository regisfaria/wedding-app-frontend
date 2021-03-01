import React, { useEffect, useState } from 'react';
import AppHeader from '../../components/AppHeader';
import api from '../../services/api';
import Post from './components/Post';
import loadingGif from '../../assets/loading.gif';
import { Container, Content, Loading, PostFeed } from './styles';

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

const Approvals: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/posts/0').then(response => {
      setPosts(response.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <Container>
      <AppHeader />

      <Content>
        {isLoading ? (
          <Loading>
            <img src={loadingGif} alt="loading..." />
          </Loading>
        ) : (
          <>
            {posts.length && (
              <PostFeed>
                {posts.map(post => (
                  <Post key={post._id.$oid} post={post} />
                ))}
              </PostFeed>
            )}
          </>
        )}
      </Content>
    </Container>
  );
};

export default Approvals;
