import React from "react";
import styled from "styled-components";
import { Link, useRouteError } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Container>
        <div className="center">
          <img
            src="https://cdn1.iconfinder.com/data/icons/photo-stickers-words/128/word_18-1024.png"
            alt="Not Found"
            width={"400px"}
            height={"400px"}
          />
          <header className="font-bold text-4xl">Page not Found</header>
          <h1 className="font-bold text-1xl">
            Sorry ,requested page could not found
          </h1>
          <Link to="/">
            <button className="btn btn-accent">Go Back HOME</button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="text-4xl text-center flex-col">
      <h1>Something went Wrong</h1>
    </Container>
  );
};

export default Error;
