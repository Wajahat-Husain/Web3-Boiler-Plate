import React from 'react'
import styled from "styled-components";

const Status = styled.div`
position: fixed;
display: flex;
font-size: 18px;
justify-content: space-between;
top: 2rem;
right: 2rem;

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
margin-right: 3px;
border-radius: 50%`;

const RedBox = styled(Box)`
background-color: #ff605c`;


const GreenBox = styled(Box)`
background-color: #00ca4e`;

const ConnectionStatus = ({ status }) => {
    return (
        <>
            {status ?
                <Status>
                    <div className="circle">
                        <GreenBox />
                        <span>
                            Connected
                        </span>
                    </div>
                </Status> :
                <Status>
                    <div className="circle">
                        <RedBox />
                        <span>
                            Disconnected
                        </span>
                    </div>
                </Status>
            }
        </>
    )
}

export default ConnectionStatus