import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as auth from '../auth';
import { provider } from '../firebase';

const MainMenu = (props) => {
    const googleLogin = (e) => {
        e.preventDefault();
        auth.signInWithRedirect(provider);
    }

    const isLoggedIn = Boolean(props.loggedInUser.userId);

    const submitMatchLink = isLoggedIn ?
        (
            <li>
                <NavLink to="/SubmitMatch" exact activeClassName="active">
                    <i className="fas fa-plus-square fa-2x"></i>
                    Submit Match
                </NavLink>
            </li>
        ) :
        null;

    // const loginBlock = isLoggedIn ?
    //     (
    //         <li>
    //             <button onClick={auth.doSignOut} className="sign-out-button">Sign Out</button>
    //         </li>
    //     ) :
    //     (
    //         <li>
    //             <a onClick={(e) => googleLogin(e)} href="">
    //                 <i className="fas fa-user fa-2x"></i>
    //                 Login
    //             </a>
    //         </li>
    //     )

    return (
        <MainMenuWrapper>
            <h1>Pong Zone</h1>

            <ul className="primary-menu">
                <li>
                    <NavLink to="/" exact activeClassName="active">
                        <i className="fas fa-trophy fa-2x"></i>
                        Leaderboard
                        </NavLink>
                </li>
                {submitMatchLink}
                <li>
                    <NavLink to="/history" exact activeClassName="active">
                        <i className="fas fa-list fa-2x"></i>
                        Match History
                    </NavLink>
                </li>
            </ul>
        </MainMenuWrapper>
    )
}

const mapStateToProps = state => ({
    loggedInUser: state.user
});

const MainMenuWrapper = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    background: #011627;
    width: 100%;
    padding: 1em;
    color: #fff;
    z-index: 5;

    h1 {
        display: none;
    }

    ul {
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin: 0;
        width: 100%;
    }

    li {
        display: block;
        list-style: none;
        text-align: center;
        font-size: 0.8em;
    }

    li svg {
        display: block;
        margin: 0 auto 0.2em;
    }

    a {
        color: #fff;
        text-decoration: none;
    }

    a:hover {
        color: #FCD581;
    }

    a.active {
        color: #FCD581;
    }

  @media screen and (min-width: 800px) {
      .primary-menu {
        max-width: 800px;
        margin: 0 auto;
      }

      .primary-menu li {
          flex-grow: 1;
          width: auto;
      }
  }
  `;


export default withRouter(connect(mapStateToProps)(MainMenu));