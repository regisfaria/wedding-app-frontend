import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

export const Content = styled.main`
  width: 800px;
  margin: 20px 20px 0 20px;
  display: flex;
  flex-direction: row;
`;

export const PostFeed = styled.div`
  display: block;

  overflow: auto;

  width: 100%;
  height: 90vh;

  align-items: flex-start;
  justify-content: center;
`;
