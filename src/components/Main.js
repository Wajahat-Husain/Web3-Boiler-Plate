import React, { useState } from "react";
import Tabs from "./Tabs";
import Dropdown from "./Dropdown";
import ConnectionStatus from "../subComponents/ConnectionStatus";


const Main = () => {
  const [network, setNetwork] = useState("");
  const [status, setStatus] = useState(false);

  const items = ['SepoliaTestnet', 'BinanceTestnet', 'PolygonTestnet'];

  const selectedNetwork = (network) => {
    console.log('Main');
    console.log(network)
    setNetwork(network);
  };

  const isStatus = (state) => {
    console.log('Main');
    console.log(state)
    setStatus(state);
  };


  return (
    <>
      <Dropdown items={items} selectedNetwork={selectedNetwork} />
      <ConnectionStatus status={status}/>
      <Tabs network={network} isStatus={isStatus} />
    </>
  )
}

export default Main