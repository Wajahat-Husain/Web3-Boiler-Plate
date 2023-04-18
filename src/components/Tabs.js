import React, { useState } from "react";
import styled from "styled-components";
import DashBoard from "../tabs/DashBoard";
import CustomToken from "../tabs/CustomToken";//
import TransactionHistory from "../tabs/TransactionHistory ";

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  position: relative;
  top: 2rem;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  margin: 4px;
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 18px;
  color: ${props => props.active ? "#ffffff" : "#090909"};
  background-color: ${props => props.active ? "#FF5722" : "#e8e8e8"};
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  border-radius: 0.5em;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${props => props.active ? "#FF5722" : "#F5F5F5"};
    color: ${props => props.active ? "#FFF" : "#333"};
  }

  @media screen and (max-width: 768px) {
    padding: 0.7em 1em;
    font-size: 16px;
  }
`;

const TabContentContainer = styled.div`
background-color: #F5F5F5;
flex-direction: column;
width: 65rem;

padding: 5px;
border-radius: 10px;
margin: 0 auto;


`

const Tools = styled.div`
display: flex;
justify-content: left;
/* align-item: start; */
padding: 7px;

.circle {
padding: 0 4px;
}
`;

const Box = styled.span`
display: inline-block; 
align-items: center; 
width: 10px; 
height: 10px; 
padding: 1px; 
border-radius: 50%
`;

const RedBox = styled(Box)`
background-color: #ff605c`;

const YellowBox = styled(Box)`
background-color: #ffbd44`;

const GreenBox = styled(Box)`
background-color: #00ca4e`;


const TabContent = styled.div`
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

const TabContainer = ({network, isStatus}) => {
    const [activeTab, setActiveTab] = useState(1);
    const [userInfo, setUserInfo] = useState({});
    const [web3Obj, setweb3Obj] = useState({});

    const userInfoDetails = (userData) => {
        setUserInfo(userData);
        if(userInfo.account === undefined){
            isStatus (false)
        }else{
             isStatus(true)
        }
    };
    const web3ObjDetails = (etherData) => {
        setweb3Obj(etherData)
    }
    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <>
            <TabsContainer>
                <Tab active={activeTab === 1} onClick={() => handleTabClick(1)} >
                    <span>
                        Dashboard
                    </span>
                </Tab>
                <Tab active={activeTab === 2} onClick={() => handleTabClick(2)}>
                    <span>
                        Transaction History
                    </span>
                </Tab>
                <Tab active={activeTab === 3} onClick={() => handleTabClick(3)}>
                    <span>
                        ERC20 Contract
                    </span>
                </Tab>
            </TabsContainer>
            <TabContentContainer>
                <Tools>
                    <div className="circle">
                        <RedBox />
                    </div>
                    <div className="circle">
                        <YellowBox />
                    </div>
                    <div className="circle">
                        <GreenBox />
                    </div>
                </Tools>
                <TabContent>
                    {activeTab === 1 ? (
                        <DashBoard network = {network} userInfoDetails={userInfoDetails} web3ObjDetails={web3ObjDetails} />
                    ) : activeTab === 2 ?(<TransactionHistory userInfo={userInfo} web3Obj={web3Obj}/>):
                      activeTab === 3 ?(<CustomToken userInfo={userInfo} web3Obj={web3Obj}/>):(
                        <>
                        </>
                    )}
                </TabContent>
            </TabContentContainer>
        </>
    );
};

export default TabContainer;
