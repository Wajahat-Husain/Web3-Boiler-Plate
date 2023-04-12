import React from 'react'
import styled from 'styled-components';

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  border: solid 1.5px #FF5722;
  border-radius: 1rem;
  background: none;
  padding: 1rem;
  font-size: 1rem;
  color: #f5f5f5;
  transition: border 150ms cubic-bezier(0.4,0,0.2,1);

  &:focus,
  &:valid {
    outline: none;
    border: 1.5px solid #1a73e8;
  }

  &:focus ~ label,
  &:valid ~ label {
    transform: translateY(-50%) scale(0.8);
    background-color: #F5F5F5;
    padding: 0 .2em;
    color: #2196f3;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 15px;
  color: #ff605c;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4,0,0.2,1);
`;

const Token = ({userInfo, web3Obj}) => {
    return (
        <>
            <InputGroup>
                <Input required type="text" name="text" autoComplete="off" />
                <Label>First Name</Label>
            </InputGroup>
        </>
    )
}

export default Token