/* eslint-disable */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import tokenAbi from '../config/ContractConfig.json'

const InputGroup = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const TokenTableContainer = styled.div`
  height: 305px;
  margin-left: 4rem;
  max-width: 58rem;
  overflow-y: auto;
  
  background-color: #f2f2f2;
  /* padding: 20px; */
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 1rem;
  margin-bottom:1rem;
`;

const TokenTable = styled.table`
  width: 100%;
`;

const TokenHeader = styled.thead`
  background-color: #FF5722;
  border: 5px solid black;
  padding: 10rem;
  color: white;
  font-size: 1.1rem;
`;

const TokenRow = styled.tr`
  text-align: center;
  &:nth-child(even) {
    background-color: #f2f2f2;
    
  }

  &:hover {
    background-color: #ddd;
  }
`;

const TokenData = styled.td`
  padding: 0.8rem 1rem;
  /* align-items: center; */
  /* text-align: left; */
  font-size: 1rem; // Set unique text size
`;

const Group = styled.div`
display: flex;
align-items: center;
margin-top: 1rem;
`

const Input = styled.input`
  border: solid 1.5px #333333;
  margin-left: 4rem;
  border-radius: 0.5rem;
  background: none;
  padding: 0.7rem;
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
  margin-left: 4rem;
  left: 15px;
  color: #737373;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 150ms cubic-bezier(0.4,0,0.2,1);
`;

const SubmitButton = styled.button`
display: inline-block;
margin-left: 35rem;
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

const AddCustomToken = ({ userInfo , web3Obj}) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokens, setTokens] = useState([]);

  useEffect(()=>{
     tokenDetails(userInfo.connectionid);
  },[userInfo])

  const handleTokenAddressChange = (e) => {
    setTokenAddress(e.target.value);
    console.log(tokenAddress)
  };

  const addToken = async () => {
   const data = await axios.post('http://localhost:3001/addCustomTokens', {connectionId:userInfo.connectionid,token: tokenAddress})
   alert(data.data)
   tokenDetails(userInfo.connectionid);
   setTokenAddress('');
  };

  const tokenDetails = async (chainid) => {
    const ownedTokenIds = [];
    let data = await axios.get(`http://localhost:3001/getAllChainCustomToken?connectionId=${chainid}`)

   for(const tokens of data.data){
     console.log(tokens)
     let methods = new web3Obj.eth.Contract(tokenAbi.ABI, tokens)
     let tokeName = await methods.methods.name().call();
     let symbol = await methods.methods.symbol().call();
     let decimals = await methods.methods.decimals().call();
     let balance = await methods.methods.balanceOf(userInfo.account).call();
     balance = Number(balance) / Number(`1` + '0'.repeat(decimals))
     console.log(symbol)
     ownedTokenIds.push({'name':tokeName, 'symbol':symbol, 'decimal':decimals, 'balance':balance})
   }
   setTokens(ownedTokenIds)
   console.log(tokens)

  }


  return (
    <>
      <Group>
        <InputGroup>
          <Input
            required
            type="text"
            name="tokenAddress"
            autoComplete="off"
            value={tokenAddress}
            onChange={handleTokenAddressChange}
          />
          <Label>Token Address</Label>
        </InputGroup>
        <SubmitButton type="button" onClick={addToken}>
          Add Token
        </SubmitButton>
      </Group>

      <TokenTableContainer>
        <TokenTable>
          <TokenHeader>
            <tr>
              <th>TokenName</th>
              <th>Symbol</th>
              <th>Decimal</th>
              <th>Balance</th>
            </tr>
          </TokenHeader>
          <tbody>
            {tokens.map((token, index) => (
              <TokenRow key={index}>
                <TokenData>{token.name}</TokenData>
                <TokenData>{token.symbol}</TokenData>
                <TokenData>{token.decimal}</TokenData>
                <TokenData>{token.balance}</TokenData>
              </TokenRow>
            ))}
          </tbody>
        </TokenTable>
      </TokenTableContainer>
    </>
  )
}

export default AddCustomToken