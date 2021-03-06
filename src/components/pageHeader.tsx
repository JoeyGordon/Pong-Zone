import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as auth from '../auth';
import { provider } from '../firebase';
import User from '../models/user';

import { MainLayoutProps } from "./mainLayout";

type Props = {
    title: string;
}

type PageHeaderState = {
    dropdownOpen: boolean
}

class PageHeader extends React.Component<Props & MainLayoutProps, PageHeaderState> {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
        };

        this.handleUserDropdown = this.handleUserDropdown.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
    }

    handleUserDropdown() {
        const newDropdownState = !this.state.dropdownOpen;
        this.setState({
            dropdownOpen: newDropdownState,
        })
    }

    googleLogin(e) {
        e.preventDefault();
        auth.signInWithRedirect(provider);
    }

    render() {
        const { loggedInUser, title, children } = this.props;
        const isLoggedIn = Boolean(loggedInUser.id);
        const photoBlock = isLoggedIn ?
            <button onClick={this.handleUserDropdown}>
                <img className="logged-in-user-photo" src={loggedInUser.photoURL} alt="" />
            </button> :
            <a className="login-button" onClick={(e) => this.googleLogin(e)} href="">
                Sign In
            </a>;
        const userDropdown = this.state.dropdownOpen ?
            <div className="dropdownMenu">
                <button onClick={auth.doSignOut} className="sign-out-button">Sign Out</button>
            </div> :
            null

        return (
            <PageHeaderWrapper>
                <div className="page-header">
                    <div className="page-header-content">
                        <h1>{title}</h1>
                        {photoBlock}
                        {userDropdown}
                    </div>
                    {children}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <polygon fill="white" points="0,100 100,0 100,100" />
                    </svg>
                </div>
            </PageHeaderWrapper>
        )
    }
}

const mapStateToProps = state => ({
    loggedInUser: state.user
});

const PageHeaderWrapper = styled.div`
    .page-header-content {
        position: relative;
        display: flex;
        align-items: center;
    }

    button {
        border: none;
        background: transparent;
        cursor: pointer;
        outline: none;
        padding: 0;
        line-height: 0px;
    }

    h1 {
        flex: 1;
        font-weight: 100;
        font-size: 20px;
        background-image: url(/img/logo@2x.png);
        background-repeat: no-repeat;
        background-size: auto 100%;
        padding: 5px 0 5px 40px;
        margin: 0 16px;
        height: auto;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .logged-in-user-photo {
        margin-left: auto;
        height: 40px;
        width: 40px;
        border-radius: 50%;
    }

    .dropdownMenu {
        position: absolute;
        background: white;
        right: 0px;
        top: 45px;
        color: #011627;
        padding: 8px 16px;
        z-index: 100;
        box-shadow: 0 2px 2px 0 rgba(218,218,218,0.50);
    }

    .login-button {
        display: flex;
        align-items: center;
        height: 40px;
        margin-right: 16px;
    }

  @media screen and (min-width: 800px) {
      h1 {
          margin-left: 0px;
      }

      .login-button {
          margin-right: 0px;
      }
  }
`;

export default connect(mapStateToProps)<Props & MainLayoutProps>(PageHeader);