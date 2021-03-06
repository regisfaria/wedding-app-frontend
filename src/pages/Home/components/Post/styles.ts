import styled, { css } from 'styled-components';

interface PressedButtonProps {
  pressed: boolean;
}

export const Container = styled.div`
  max-width: 1120px;
  margin: 20px 20px 0 20px;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  border: 1px solid #999591;
`;

export const PostImage = styled.div`
  width: 100%;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const PostInfo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  width: 100%;

  padding: 0 20px;

  justify-content: space-between;

  section {
    strong {
      font-size: 30px;
      margin-bottom: 20px;
    }

    p {
      font-size: 18px;
      margin-top: 10px;
    }
  }

  div {
    display: flex;
    flex-direction: column;

    align-items: center;

    img {
      width: 120px;
      height: 120px;

      border-radius: 50%;
    }

    strong {
      margin-top: 10px;
    }
  }
`;

export const LikeButton = styled.button<PressedButtonProps>`
  background: transparent;
  border: 0;
  width: 30px;
  height: 30px;

  svg {
    transition: color 0.225s;

    width: 30px;
    height: 30px;

    ${props =>
      props.pressed
        ? css`
            color: #036bfc;
          `
        : css`
            color: #999591;
          `}
  }
  &:hover {
    svg {
      color: #036bfc;
    }
  }

  @media (min-width: 1024px) {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const DislikeButton = styled.button<PressedButtonProps>`
  background: transparent;
  border: 0;
  width: 30px;
  height: 30px;

  svg {
    transition: color 0.225s;

    width: 30px;
    height: 30px;

    ${props =>
      props.pressed
        ? css`
            color: #c53030;
          `
        : css`
            color: #999591;
          `}
  }

  &:hover {
    svg {
      color: #c53030;
    }
  }

  @media (min-width: 1024px) {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export const LikeSection = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 40px;

  align-items: center;
  justify-content: space-evenly;
`;

export const CommentFormSection = styled.div`
  form {
    display: flex;
    flex-direction: row;

    width: 100%;

    align-items: center;
    justify-content: space-evenly;

    div {
      width: 600px;
    }

    button {
      margin-left: 10px;
      background: transparent;
      border: 0;
      width: 30px;
      height: 30px;

      svg {
        transition: color 0.225s;

        color: #999591;
        width: 30px;
        height: 30px;
      }

      &:hover {
        svg {
          color: #c53030;
        }
      }

      @media (min-width: 1024px) {
        svg {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
  margin-bottom: 10px;
`;

export const Comments = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: flex-start;

  padding: 0 20px;

  overflow: auto;
  height: 200px;

  h1 {
    margin-bottom: 10px;
  }
`;

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;

  width: 600px;

  align-items: center;
  justify-content: space-between;

  & + div {
    margin-top: 10px;
  }
`;

export const CommentAuthorImg = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  img {
    width: 40px;
    height: 40px;

    border-radius: 50%;
  }

  strong {
    margin-top: 10px;
    font-size: 6px;
  }
`;
