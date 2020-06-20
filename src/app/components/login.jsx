import React from "react";
import { connect } from "react-redux";
import * as mutations from '../store/mutations';

export const Login = ( { authenticateUser } ) => (
    <div>
        <h2>LOGIN!!!</h2>
        <form onSubmit={authenticateUser}>
            <input type="text" name="username" id="username" placeholder="Username"/>
            <input type="password" name="password" id="password" placeholder="password"/>
            <input type="submit" value="LOGIN"/>
        </form>
    </div>
);

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(e) {
        e.preventDefault();
        const username = e.target['username'].value;
        const password = e.target['password'].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
