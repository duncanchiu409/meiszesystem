import React from "react";
import styled from "styled-components";

const StyledContactForm = styled.div`
  width: 400px;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;

const Promotion = () => {


    return (
        <div className="main">
        <div
          className="App"
          style={{ width: "100%", padding: "100px", height: "1000px" }}
        >
          <div style={{ padding: "0px 215px" }} className="container">
        <StyledContactForm>
          <form  >
            <label>Email/SMS</label>
            <input type="text" name="user_name" />
            <label>Subject</label>
            <input type="email" name="user_email" />
            <label>Message</label>
            <textarea name="message" />
            <input className="btn-create" value="Send" />
          </form>
        </StyledContactForm>
        </div>
        </div>
      </div>
      );
}

export default Promotion