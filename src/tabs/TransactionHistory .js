/* eslint-disable */
import React, { useState, useEffect } from "react";
import axios from "axios";
import links from "../config/networkHyperLink.json"
import styled from "styled-components";

const TransactionHistoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 850px;
  height: 650px; // Set a fixed height for the container
  overflow: auto; // Make the container scrollable
  margin-top: 1rem;
  margin-left: 5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #FF5722; // Update the color to the theme color
  margin-bottom: 20px;
`;

const TransactionList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Transaction = styled.li`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  margin-bottom: 15px;
`;

const TransactionDetail = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #333;
`;

const Value = styled.span`
  font-size: 14px;
  color: #555;
`;

const Link = styled.a`
  display: inline-block;
  background-color: #FF5722;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  margin-top: 8px;
  margin-left: 37rem;
  max-width: fit-content;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e64a19;
  }
`;

const TransactionHistory = ({ userInfo, web3Obj }) => {
  const [transactions, setTransactions] = useState([]);
  const [chainHttp, setChainHttp] = useState('');

  useEffect(() => {
    fetchTransactionHistory(userInfo.connectionid);
  }, [userInfo]);

  const fetchTransactionHistory = async (chainid) => {
    const transactionHistory = [];
    setChainHttp(links[`0x${userInfo.connectionid}_Http_url`])
    try {
      let data = await axios.get(`http://localhost:3001/getAllTransactionHash?connectionId=${chainid}`)
      console.log(data.data)

      for(const tokens of data.data){
      let result = await web3Obj.eth.getTransactionReceipt(tokens)
      transactionHistory.push({ 'from': result.from, 'to': result.to, 'effectiveGasPrice': result.effectiveGasPrice, 'blockNumber': result.blockNumber, 'transactionHash': result.transactionHash })
    }
    setTransactions(transactionHistory);
    console.log(transactions)
    } catch (error) {
      console.error("Error fetching transaction history:", error);
    }
  };

  return (
    <TransactionHistoryContainer>
      <Title>Transaction History</Title>
      <TransactionList>
        {Array.isArray(transactions) && transactions.map((transaction, index) => (
          <Transaction key={index}>
            <TransactionDetail>
              <Label>From:</Label>
              <Value>{transaction.from}</Value>
            </TransactionDetail>
            <TransactionDetail>
              <Label>To:</Label>
              <Value>{transaction.to}</Value>
            </TransactionDetail>
            <TransactionDetail>
              <Label>Effective Gas Price:</Label>
              <Value>{transaction.effectiveGasPrice} Gwei</Value>
            </TransactionDetail>
            <TransactionDetail>
              <Label>Block Number:</Label>
              <Value>{transaction.blockNumber}</Value>
            </TransactionDetail>
            <Link href={`${chainHttp}${transaction.transactionHash}`} target="_blank" rel="noopener noreferrer">
              View on BlockExplorer
            </Link>
          </Transaction>
        ))}
      </TransactionList>
    </TransactionHistoryContainer>
  );
};


export default TransactionHistory;
