import styled from "styled-components";

export const LoginStyle = styled.div`
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 2rem;
`;

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    to right,
    rgba(255, 228, 196, 0.203),
    rgba(255, 228, 196, 0.303)
  );
  position: relative;
`;

export const From = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: aliceblue;
  border-radius: 0rem 2rem 2rem 0rem;

  h1 {
    margin-bottom: 50px;
  }

  button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: rgb(0, 255, 255);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: rgba(0, 255, 255, 0.7);
  }
`;

export const Image = styled.img`
  height: 100%;
  width: 50%;
  border: 1px solid black;
  border-radius: 2rem 0rem 0rem 2rem;
`;
export const Reset = styled.span`
  font-size: large;
  font-weight: bolder;
  cursor: pointer;
  margin-top: 10px;

  &.sign-up {
    color: lightblue;
  }
  &:hover {
    color: red;
    font-size: larger;
  }
`;
export const Role = styled.button`
  position: absolute;
  background-color: aqua;
  width: 50px;
  height: 30px;
  top: 20px;
  right: 10px;
  border-radius: 10px;
`;
export const LoginFrom = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  input {
    margin: 10px 0;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 130%;
    box-sizing: border-box;
    font-size: 16px;
  }
`;
