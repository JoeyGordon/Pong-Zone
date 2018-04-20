import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const UserProfile = (props) => {
    return (
        <UserProfileWrapper>
            You picked {props.user.name}
            <p>We can show whatever here</p>
        </UserProfileWrapper>
    )
}

UserProfile.propTypes = {
    user: PropTypes.object,
};

const UserProfileWrapper = styled.div`
  background: #EEE;
`;

export default UserProfile;