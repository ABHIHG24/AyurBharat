import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
`;

const Text = styled.h1`
  margin-top: 20px;
`;

const Loading = () => {
  return (
    <Container>
      <LoadingContainer />
      <Text>Loading . . .</Text>
    </Container>
  );
};

export default Loading;
