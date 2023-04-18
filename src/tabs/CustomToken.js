import React, { useState } from 'react'
import styled from 'styled-components';
import data from '../config/ContractConfig.json'
import axios from 'axios';
import { Decimal } from 'decimal.js';
var BigNumber = require('bignumber.js');

const Container = styled.div`
 /* max-width: 850px; */
  height: 720px;
  /* max-height: 650px; // Set the desired fixed height */
  overflow-y: auto;
  /* padding: 0.rem; */
`;

const Form = styled.form`
 padding: 1.5rem;
 max-width: 600px;
 margin: 0 auto;
 margin-top: 1rem;
 margin-bottom: 2rem;
 display: flex;
 align-items: center;
 border-radius: 1.5em;
 box-shadow: -6px -6px 12px #ffffff, 6px 6px 12px #c5c5c5;
 flex-direction: column;
`;

const FormTitle = styled.h2`
  font-size: 1.6rem;
  color: #FF5722;
  margin-top: 0;
  text-align: center;
`;

const InputGroup = styled.div`
  position: relative;
  margin-top: 1rem;
`;
const Input = styled.input`
  border: solid 1.5px #333333;
  border-radius: 1rem;
  background: none;
  padding: 1rem;
  font-size: 1rem;
  color: #333333;
  transition: border 150ms cubic-bezier(0.4,0,0.2,1);

  &:focus,
  &:valid {
    outline: none;
    border: 1.5px solid #FF5722;
  }

  &:focus ~ label,
  &:valid ~ label {
    transform: translateY(-50%) scale(0.8);
    background-color: #F5F5F5;
    padding: 0 .2em;
    color: #ff605c;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 15px;
  color: #737373;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4,0,0.2,1);
`;

const SubmitForm = styled.button`
display: inline-block;
transition: all 0.2s ease-in;
position: relative;
overflow: hidden;
z-index: 1;
color: #090909;
padding: 0.7em 1.7em;
margin-top: 1rem;
font-size: 18px;
border-radius: 0.5em;
background: #e8e8e8;
border: 1px solid #e8e8e8;
box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

&:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

&:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%) scaleY(1) scaleX(1.25);
  top: 100%;
  width: 140%;
  height: 180%;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

&:after {
  content: "";
  position: absolute;
  left: 55%;
  transform: translateX(-50%) scaleY(1) scaleX(1.45);
  top: 180%;
  width: 160%;
  height: 190%;
  background-color: #FF5722;
  border-radius: 50%;
  display: block;
  transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
  z-index: -1;
}

&:hover {
  color: #ffffff;
  border: 1px solid #FF5722;
}

&:hover:before {
  top: -35%;
  background-color: #FF5722;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}

&:hover:after {
  top: -45%;
  background-color: #FF5722;
  transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
}
`;

const CustomToken = ({ userInfo, web3Obj }) => {
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");

    const addressValue = (e) => {
        setAddress(e.target.value);
    }
    const amountValue = (e) => {
        setAmount(e.target.value);
    }

    const mintToken = async (e) => {

        e.preventDefault();
        let methods = new web3Obj.eth.Contract(data.ABI, data[`0x${userInfo.connectionid}_Contract_Address`])
        let decimal = await methods.methods.decimals().call();
        let x = new Decimal(amount);
        let y = new Decimal(Number(`1` + "0".repeat(decimal)));
        let a = x.mul(y);
        let quantity = new BigNumber(a);
        console.log("Big Number Price", quantity.valueOf());

        const result = await methods.methods.mint(address, quantity).send({
            from: userInfo.account,
        })
        console.log(result)
        alert(result.transactionHash);
        storeTransationDetails(result.transactionHash);  // Storing tranaction hash 
        setAddress("");
        setAmount("");

    }

    const transferToken = async (e) => {

        e.preventDefault();
        console.log(data.ABI)
        let methods = new web3Obj.eth.Contract(data.ABI, data[`0x${userInfo.connectionid}_Contract_Address`])
        let decimal = await methods.methods.decimals().call();
        let x = new Decimal(amount);
        let y = new Decimal(Number(`1` + "0".repeat(decimal)));
        let a = x.mul(y);
        let quantity = new BigNumber(a);
        console.log("Big Number Price", quantity.valueOf());

        const result = await methods.methods.transfer(address, quantity).send({
            from: userInfo.account,
        })
        console.log(result)
        alert(result.transactionHash);
        storeTransationDetails(result.transactionHash);  // Storing tranaction hash 
        setAddress("");
        setAmount("");

    }

    const approveToken = async (e) => {

      e.preventDefault();
      console.log(data.ABI)
      let methods = new web3Obj.eth.Contract(data.ABI, data[`0x${userInfo.connectionid}_Contract_Address`])
      let decimal = await methods.methods.decimals().call();
      let x = new Decimal(amount);
      let y = new Decimal(Number(`1` + "0".repeat(decimal)));
      let a = x.mul(y);
      let quantity = new BigNumber(a);
      console.log("Big Number Price", quantity.valueOf());

      const result = await methods.methods.approve(address, quantity).send({
          from: userInfo.account,
      })
      console.log(result)
      alert(result.transactionHash);
      storeTransationDetails(result.transactionHash);  // Storing tranaction hash 
      setAddress("");
      setAmount("");

    }

    const balanceOfToken = async (e) => {

      e.preventDefault();
      console.log(data.ABI)
      let methods = new web3Obj.eth.Contract(data.ABI, data[`0x${userInfo.connectionid}_Contract_Address`])
      
      const amount = await methods.methods.balanceOf(address).call({})

      let decimal = await methods.methods.decimals().call();
      let x = new Decimal(amount);
      let y = new Decimal(Number(`1` + "0".repeat(decimal)));
      let a = x.div(y);
      let quantity = new BigNumber(a);
      console.log("Big Number Price", quantity.valueOf());

      console.log(quantity)
      alert(quantity);
      setAddress("");

    }
    
    const storeTransationDetails = async( transactionHash) => {
      const data = await axios.post('http://localhost:3001/addTransactionHash', {connectionId:userInfo.connectionid, transactionHash: transactionHash})
      alert(data.data)
    }

    return (
        <Container>
          
            <Form onSubmit={mintToken}>
                <FormTitle>Mint Token Function</FormTitle>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={address} onChange={addressValue} />
                    <Label>To Address</Label>
                </InputGroup>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={amount} onChange={amountValue} />
                    <Label>Amount</Label>
                </InputGroup>
                <SubmitForm >
                    <span>
                        Mint Token
                    </span>
                </SubmitForm>
            </Form>

            <Form onSubmit={transferToken}>
                <FormTitle>Transfer Token Function</FormTitle>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={address} onChange={addressValue} />
                    <Label>To Address</Label>
                </InputGroup>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={amount} onChange={amountValue} />
                    <Label>Amount</Label>
                </InputGroup>
                <SubmitForm >
                    <span>
                        Transfer Token
                    </span>
                </SubmitForm>
            </Form>

            <Form onSubmit={approveToken}>
                <FormTitle>Approve Token Function</FormTitle>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={address} onChange={addressValue} />
                    <Label>To Address</Label>
                </InputGroup>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={amount} onChange={amountValue} />
                    <Label>Amount</Label>
                </InputGroup>
                <SubmitForm >
                    <span>
                        Approve Token
                    </span>
                </SubmitForm>
            </Form>

            <Form onSubmit={balanceOfToken}>
                <FormTitle>Balanace Of Function</FormTitle>
                <InputGroup>
                    <Input required type="text" name="text" autoComplete="off" value={address} onChange={addressValue} />
                    <Label>Address</Label>
                </InputGroup>
                <SubmitForm >
                    <span>
                      Address balance
                    </span>
                </SubmitForm>
            </Form>

        </Container>
    )
}

export default CustomToken