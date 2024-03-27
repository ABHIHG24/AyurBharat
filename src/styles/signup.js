import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  text-align: center;
  background: linear-gradient(
    to right,
    rgba(255, 228, 196, 0.403),
    rgba(255, 228, 196, 0.503)
  );
  font-family: Arial, sans-serif;
`;

export const FormContainer = styled.div`
  height: 80vh;
  width: 100vw;

  display: flex;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 300px;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-size: large;
  font-weight: bold;
  gap: 40px;

  img {
    width: 200px;
    height: 200px;
    border-radius: 20%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  font-weight: bolder;
  margin-right: 200px;
  gap: 10px;

  label {
    font-weight: bold;
  }

  input {
    width: 300px;
    height: 30px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  span {
    margin: 0 auto;
  }
  button {
    width: 50px;
    padding: 10px;
    margin-right: 20px;
    background-color: rgb(0, 255, 255);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
  }

  button:hover {
    background-color: rgba(0, 255, 255, 0.7);
    color: red;
  }
`;
