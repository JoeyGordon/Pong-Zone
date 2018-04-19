import React from 'react';
// import PropTypes from 'prop-types';

import MatchCard from './matchCard';

const History = (props) => {
    return (
        <div>
            <h1>History</h1>

            <MatchCard />
            <MatchCard />
        </div>
    )
}

// History.contextTypes = {
//     authUser: PropTypes.object,
// };

export default History;