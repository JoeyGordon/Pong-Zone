import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const PageHeader = (props) => {
    const isLoggedIn = Boolean(props.loggedInUser.userId);
    const photoBlock = isLoggedIn ? <img className="logged-in-user-photo" src={props.loggedInUser.photoURL} alt="" /> : null;

    return (
        <PageHeaderWrapper>
            <div className="page-header">
                <div className="page-header-content">
                    <h1>{props.title}</h1>
                    {photoBlock}
                </div>
                {props.children}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon fill="white" points="0,100 100,0 100,100" />
                </svg>
            </div>
        </PageHeaderWrapper>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.user
});

const PageHeaderWrapper = styled.div`
    .page-header-content {
        display: flex;
        align-items: center;
    }

    h1 {
        flex: 1;
        font-weight: 100;
        font-size: 20px;
        background-image: url(/img/logo@2x.png);
        background-repeat: no-repeat;
        background-size: auto 100%;
        padding: 5px 0 5px 40px;
        margin: 0 16px 0 0;
        height: auto;
    }

    .logged-in-user-photo {
        flex: 0;
        margin-left: auto;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }
`;

export default connect(mapStateToProps)(PageHeader);