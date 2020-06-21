import React from "react";
import { Provider } from "react-redux";
import { store } from '../store';
import { ConnectedDashboard } from "./dashboard";
import { ConnectedLogin } from "./login";
import { ConnectedSignup } from './signup';
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./navigation";
import { ConnectedTaskDetails } from "./taskDetails";
import { Redirect } from 'react-router'

const RouteGuard = Component => ( { match } ) => {
    if ( !store.getState().session.authenticated ) {
        return <Redirect to='/' />
    } else {
        return <Component match={match} />
    }
};

export const Main = ()=> (
    <Router history={history}>
        <Provider store={store}>
            <div>
                <ConnectedNavigation/>
                <Route
                    exact
                    path="/"
                    component={ ConnectedLogin }
                />
                <Route
                    exact
                    path="/signup"
                    component={ ConnectedSignup }
                />
                <Route
                    exact
                    path="/dashboard"
                    render={ RouteGuard(ConnectedDashboard) }
                />
                <Route
                    exact
                    path="/tasks/:id"
                    render={({match}) => <ConnectedTaskDetails match={match}/>}
                />
            </div>
        </Provider>
    </Router>
)
