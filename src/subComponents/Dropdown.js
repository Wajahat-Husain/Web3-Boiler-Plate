import React, { useState} from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: fixed;
  top: 2rem;
  left: 2rem;
`;

const DropdownButton = styled.button`
  display: inline-block;
  transition: all 0.2s ease-in;
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: #090909;
  padding: 0.7em 1em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  border: 1px solid #e8e8e8;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  &:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }

  &:hover {
    color: #FF5722;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 5px;
  padding: 0;
  list-style: none;
  background-color: #e8e8e8;
  border: 1px solid #e8e8e8;
  border-top: none;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  z-index: 2;
`;

const DropdownListItem = styled.li`
  padding: 0.7em 1em;
  font-size: 18px;

  &:hover {
    background-color: #FF5722;
    color: #ffffff;
  }
`;

function Dropdown({ items, selectedNetwork }) {
  const [isOpen, setIsOpen] = useState(false);
  const [networkName, setNetworkName] = useState("SelectNetwork");
  const toggleOpen = () => setIsOpen(!isOpen);

  const setNetwork = (value) => {
    setNetworkName(value)
    toggleOpen()
    saveNetworkInfo(value)
    selectedNetwork(value);
  }

  const saveNetworkInfo = (networkName) => {
    const connectNetwork = {
      networkName: networkName
    };
    window.localStorage.setItem('connectNetwork', JSON.stringify(connectNetwork)); //user persisted data

  };

  return (

    <DropdownContainer>
      <DropdownButton onClick={toggleOpen}>
        {networkName}
      </DropdownButton>
      {isOpen && items && items.length > 0 && (
        <DropdownList>
          {items.map((item) => (
            <DropdownListItem key={item} onClick={() => setNetwork(item)} >
              {item}
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}


export default Dropdown;
