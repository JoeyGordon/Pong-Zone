import React from 'react';
import styled from 'styled-components';

const LoadingScreen = (props) => {
    return (
        <LoadingScreenWrapper>
            Loading
        </LoadingScreenWrapper>
    )
}

const LoadingScreenWrapper = styled.div`
  background: goldenrod;
  height: 100%;
  width: 100%;
`;

export default LoadingScreen;