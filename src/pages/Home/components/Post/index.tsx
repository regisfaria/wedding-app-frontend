import React, { useRef, useState, useCallback } from 'react';
import 'react-day-picker/lib/style.css';
import { FiSend } from 'react-icons/fi';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import api from '../../../../services/api';

import { useToast } from '../../../../hooks/toast';

import Input from '../../../../components/Input';

import {
  Container,
  PostImage,
  PostInfo,
  LikeSection,
  CommentFormSection,
  LikeButton,
  DislikeButton,
  Comments,
  CommentContainer,
  CommentAuthorImg,
} from './styles';

interface AuthorData {
  imageUrl: string;
  name: string;
}

interface SubmitCommentFormData {
  content: string;
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

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const handleLike = useCallback(() => {
    if (liked) {
      return;
    }

    api.patch(`/posts/like/${post._id.$oid}`).then((response: any) => {
      setLikes(response.data.data.likes);
      setLiked(true);
      setDisliked(false);

      addToast({ type: 'success', title: 'Post liked' });
    });
  }, [post, addToast, liked]);

  const handleDislike = useCallback(() => {
    if (disliked) {
      return;
    }

    api.patch(`/posts/dislike/${post._id.$oid}`).then((response: any) => {
      setLikes(response.data.data.likes);
      setLiked(false);
      setDisliked(true);

      addToast({ type: 'success', title: 'Post disliked' });
    });
  }, [post, addToast, disliked]);

  const handleSumbitComment = useCallback(
    (data: SubmitCommentFormData) => {
      try {
        api
          .post('/comments', {
            postId: post._id.$oid,
            ...data,
          })
          .then(response => {
            setComments(response.data.data.comments);

            addToast({ type: 'success', title: 'Comment created!' });

            formRef.current?.clearField('content');
          });
      } catch (error) {
        console.log(error);
        addToast({ type: 'error', title: 'Could not create the comment' });
      }
    },
    [addToast, post],
  );

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
        <LikeButton type="button" pressed={liked} onClick={handleLike}>
          <AiFillLike />
        </LikeButton>
        <p>{`Likes: ${likes}`}</p>
        <DislikeButton type="button" pressed={disliked} onClick={handleDislike}>
          <AiFillDislike />
        </DislikeButton>
      </LikeSection>

      <CommentFormSection>
        <Form ref={formRef} onSubmit={handleSumbitComment}>
          <Input name="content" type="text" placeholder="Comment" />

          <button type="submit">
            <FiSend />
          </button>
        </Form>
      </CommentFormSection>

      {comments.length ? (
        <Comments>
          <h1>Comments:</h1>
          {comments.map(comment => (
            <CommentContainer key={comment.identifier}>
              <div>
                <CommentAuthorImg>
                  <img src={comment.imageUrl} alt="authorImg" />
                </CommentAuthorImg>
                <strong>{`${comment.authorName} says:`}</strong>
              </div>
              <span>{comment.content}</span>
            </CommentContainer>
          ))}
        </Comments>
      ) : (
        <h1>No Comments yet</h1>
      )}
    </Container>
  );
};

export default Post;
