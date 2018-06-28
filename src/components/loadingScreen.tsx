import * as React from 'react';
import styled from 'styled-components';

const LoadingScreen = () => {
    return (
        <LoadingScreenWrapper>
            Loading...
        </LoadingScreenWrapper>
    )
}

const LoadingScreenWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #E61D36;
  color: #FDFFFC;
  height: 100%;
  width: 100%;
  font-weight: 100;
  font-size: 3em;
`;

export default LoadingScreen;