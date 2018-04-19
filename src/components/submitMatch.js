import React from 'react';
import PropTypes from 'prop-types';

const SubmitMatch = (props, { authUser }) => {
  return (
    <div>
      <h1>Submit Match</h1>
    </div>
  )
};

SubmitMatch.contextTypes = {
  authUser: PropTypes.object,
};

export default SubmitMatch;