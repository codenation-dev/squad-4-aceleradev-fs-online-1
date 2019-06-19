import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-width: 415px;
  min-height: 290px;
  padding: 40px;
  border-radius: 3px;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  .form-check {
    margin-bottom: 0 !important;
    width: 100%;
    label {
      font-size: 12px;
      font-weight: 600;
      color: #ff8700;
      text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      margin-top: 20px;
    }
  }
  input {
    width: 100%;
    height: 50px;
    border: 0;
    border-bottom: 1px solid #ff8700;
    font-size: 18px;
    color: #ff8700;
    font-weight: bold;
    padding: 0 5px;
    margin-bottom: 10px;
    &[type='checkbox'] {
      width: auto;
      position: none;
    }

    ::placeholder {
      color: #ff8700;
      font-size: 15px;
    }
  }
  button {
    height: 47px;
    width: 270px;
    background: #ff8700;
    border-radius: 10px;
    font-size: 16px;
    padding: 0 10px;
    margin-top: 25px;
    color: #fff;
    font-weight: bold;
    border: 0;
    cursor: pointer;

    &:hover {
      background: #ff6b00;
    }
  }
  .register-options {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 15px;
    a {
      text-decoration: none;
      cursor: pointer;
      small {
        margin-top: 12px;
        font-size: 12px;
        font-weight: 600;
        color: #ff8700;
        text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;
