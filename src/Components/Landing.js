import React from 'react';
import PropTypes from 'prop-types';

const LandingPage = (props, { authUser }) => (
  <div>
    { authUser && <div>What</div> }
    <h1>Landing Page</h1>
  </div>
)

LandingPage.contextTypes = {
    authUser: PropTypes.object,
};

export default LandingPage;