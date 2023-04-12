import React, { useState } from "react";
import ConnectWallet from './ConnectWallet'
import styled from 'styled-components';

const ConnectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

const Title = styled.h3`
  font-size: 28px;
  margin-bottom: 10px;
  color: #FF5722;
  font-size: 28px;
`;

const ConnectButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  width: 60%;
  font-size: 20px;
`;




const DashBoard = ({ network, userInfoDetails, web3ObjDetails}) => {
    const [userInfo, setUserInfo] = useState({});
    const [web3Obj, setweb3Obj] = useState({});

    const userInfoValue = (userData) => {
        setUserInfo(userData);
        userInfoDetails(userData);
    };
    const web3ObjValue = (etherData) => {
        console.log("Dash_Board web3Obj", web3Obj);
        setweb3Obj(etherData);
        web3ObjDetails(etherData)
    }

    return (
        <ConnectionDetails>
            <Title>✅ CONNECT YOUR METAMASK</Title>
            <ConnectButton>
                <ConnectWallet network={network} userInfoValue={userInfoValue} web3ObjValue={web3ObjValue} />
            </ConnectButton>
            <Details>
                <span>WalletAddress :</span>
                {userInfo.account}
            </Details>
            <Details>
                <span>ChainId :</span>
                {userInfo.connectionid}
            </Details>
            <Details>
                <span>Balance :</span>
                {userInfo.balance}
            </Details>
        </ConnectionDetails>
    )
}

export default DashBoard