import * as React from "react";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { MainLayoutProps } from "./mainLayout";
import { RootState } from "../rootReducer";

const MainMenu: React.SFC<MainLayoutProps & RouteComponentProps<{}>> = props => {
  const isLoggedIn = Boolean(props.loggedInUser.id);
  const submitMatchLink = isLoggedIn ? (
    <li>
      <NavLink to="/SubmitMatch" exact activeClassName="active">
        <i className="fas fa-plus-square fa-2x" />
        Submit Match
      </NavLink>
    </li>
  ) : null;
  return (
    <MainMenuWrapper>
      <h1>Pong Zone</h1>

      <ul className="primary-menu">
        <li>
          <NavLink to="/" exact activeClassName="active">
            <i className="fas fa-trophy fa-2x" />
            Leaderboard
          </NavLink>
        </li>
        {submitMatchLink}
        <li>
          <NavLink to="/history" exact activeClassName="active">
            <i className="fas fa-list fa-2x" />
            Match History
          </NavLink>
        </li>
      </ul>
    </MainMenuWrapper>
  );
};

const mapStateToProps = (state: RootState): MainLayoutProps => ({
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
    flex-grow: 1;
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
    display: block;
    color: #fff;
    text-decoration: none;
  }

  a:hover {
    color: #fcd581;
  }

  a.active {
    color: #fcd581;
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
