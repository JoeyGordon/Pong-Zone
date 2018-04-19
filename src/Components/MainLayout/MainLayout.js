import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import * as routes from '../../Constants/routes';
import * as auth from '../../auth';

import Leaderboard from '../Leaderboard';
import SignIn from '../SignIn';

const MainLayoutWrapper = styled.div`
  display: flex;
  min-height: 100%;

  h1 {
    display: inline-block;
    font-size: 30px;
    margin: 0 1em 0 0;
    font-weight: 100;
  }

  .sidebar {
    display: flex;
    align-items: center;
    position: fixed;
    background: #191919;
    width: 100%;
    height: 64px;
    padding: 0 2em;
    color: #fff;
    z-index: 2;
  }

  .sidebar ul {
    display: inline-block;
    padding: 0;
    margin: 0;
  }

  .sidebar li {
    display: inline-block;
    list-style: none;
    margin: 0 1.5em 0;
  }

  .sidebar a {
    color: #fff;
    text-decoration: none;
  }

  .sidebar a:hover {
    color: #E53935;
  }

  .sidebar a.active {
    color: #E53935;
  }

  .sidebar img {
      margin-left: auto;
      max-height: 60%;
      width: auto;
      border-radius: 50%;
  }

  .main-content {
    padding: 2em;
    margin-top: 60px;
    flex-grow: 1;
  }
`;

const MainLayout = (props, {authUser}) => {

    const loginBlock = authUser ?
        (
            <li>
                <button onClick={auth.doSignOut}>Sign Out</button>
            </li>
        ) :
        (
            <li>
                <NavLink to="/signin" exact activeClassName="active">
                    Login
                </NavLink>
            </li>
        )

    const photoBlock = authUser ?
        (
            <img src={authUser.photoURL} />
        ) :
        null

    return (
        <MainLayoutWrapper>
            <div className="sidebar">
                <h1>Pong Zone</h1>

                <ul className="primary-menu">
                    <li>
                        <NavLink to="/" exact activeClassName="active">
                            Leaderboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/game" exact activeClassName="active">
                            Log Games
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/history" exact activeClassName="active">
                            Game History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/tournaments" exact activeClassName="active">
                            Tournaments
                        </NavLink>
                    </li>
                    {loginBlock}
                </ul>
                {photoBlock}
            </div>

            <div className="main-content">
                <Route exact path={routes.LEADERBOARD} component={() => <Leaderboard />} />
                <Route exact path={routes.SIGN_IN} component={() => <SignIn />} />
                {/* <Route
                    path="/"
                    exact
                    render={() => (
                        <PrintQueuePage
                            db={props.db}
                            apiQueue={props.apiQueue}
                            apiQueueLoaded={props.apiQueueLoaded}
                            testing={props.testing}
                        />
                    )}
                />
                <Route
                    path="/products"
                    exact
                    render={() => (
                        <ItemsPage
                            db={props.db}
                            items={props.items}
                            formats={props.formats}
                            sizes={props.sizes}
                            sizesArray={props.sizesArray}
                            itemsLoaded={props.itemsLoaded}
                        />
                    )}
                />
                <Route
                    path="/boxsets"
                    exact
                    render={() => (
                        <BoxSetsPage
                            db={props.db}
                            items={props.items}
                            boxSets={props.boxSets}
                            formats={props.formats}
                            sizes={props.sizes}
                            sizesArray={props.sizesArray}
                            boxSetsLoaded={props.boxSetsLoaded}
                        />
                    )}
                />
                <Route
                    path="/sizes"
                    exact
                    render={
                        () => (<SizesPage
                            db={props.db}
                            sizes={props.sizesArray}
                            sizesLoaded={props.sizesLoaded}
                        />)
                    }
                />
                <Route
                    path="/formats"
                    exact
                    render={
                        () => (<FormatsPage
                            db={props.db}
                            formats={props.formats}
                            formatsLoaded={props.formatsLoaded}
                        />)
                    }
                />
                <Route
                    path="/manual"
                    exact
                    render={() => (
                        <ManualEntryPage
                            db={props.db}
                            items={props.items}
                            boxSets={props.boxSets}
                            formats={props.formats}
                            sizes={props.sizes}
                            itemsLoaded={props.itemsLoaded}
                            sizesLoaded={props.sizesLoaded}
                            formatsLoaded={props.formatsLoaded}
                            boxSetsLoaded={props.boxSetsLoaded}
                            testing={props.testing}
                        />
                    )}
                /> */}
            </div>
        </MainLayoutWrapper>
    )
};

MainLayout.contextTypes = {
    authUser: PropTypes.object,
};

MainLayout.propTypes = {
};

export default MainLayout;
