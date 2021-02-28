import React, { useCallback, useState } from 'react';
import 'react-day-picker/lib/style.css';
import { FiCheck, FiX } from 'react-icons/fi';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';

import {
  Container,
  PostImage,
  PostInfo,
  LikeSection,
  ApproveButton,
  DisapproveButton,
} from './styles';

interface AuthorData {
  imageUrl: string;
  name: string;
}

interface PostData {
  _id: {
    $oid: string;
  };
  imageUrl: string;
  authorData: AuthorData;
  description: string;
  title: string;
  active: boolean;
  likes: number;
}

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { addToast } = useToast();

  const [approvalGiven, setApprovalGiven] = useState(false);

  const handleAccept = useCallback(() => {
    if (approvalGiven) {
      return;
    }

    api
      .patch(`/posts`, {
        id: post._id.$oid,
        active: true,
      })
      .then((_response: any) => {
        addToast({
          type: 'success',
          title: 'Post approved',
          description: 'Reload page to see changes',
        });
        setApprovalGiven(true);
      });
  }, [post, addToast, approvalGiven]);

  const handleNotAccept = useCallback(() => {
    if (approvalGiven) {
      return;
    }

    api
      .patch(`/posts`, {
        id: post._id.$oid,
        active: false,
      })
      .then((_response: any) => {
        addToast({
          type: 'success',
          title: 'Post not approved',
          description: 'Reload page to see changes',
        });
        setApprovalGiven(true);
      });
  }, [post, addToast, approvalGiven]);

  return (
    <Container>
      <PostInfo>
        <section>
          <strong>{post.title}</strong>
          <p>{post.description}</p>
        </section>
        <div>
          <img src={post.authorData.imageUrl} alt="authorImg" />
          <strong>{post.authorData.name}</strong>
        </div>
      </PostInfo>

      <PostImage>
        <img src={post.imageUrl} alt="postImg" />
      </PostImage>

      <LikeSection>
        <ApproveButton
          type="button"
          pressed={approvalGiven}
          onClick={handleAccept}
        >
          <FiCheck size={40} />
        </ApproveButton>

        <DisapproveButton
          type="button"
          pressed={approvalGiven}
          onClick={handleNotAccept}
        >
          <FiX size={40} />
        </DisapproveButton>
      </LikeSection>
    </Container>
  );
};

export default Post;
