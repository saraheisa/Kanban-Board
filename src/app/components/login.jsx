import React from "react";
import { connect } from "react-redux";
import * as mutations from '../store/mutations';

export const Login = ( { authenticateUser, authenticated } ) => (
    <div className="card p-3 col-6">
        <h2>LOGIN!!!</h2>
        <form onSubmit={authenticateUser}>
            <input type="text" name="username" id="username" placeholder="Username" className="form-control"/>
            <input type="password" name="password" id="password" placeholder="password" className="form-control mt-2"/>
            <input type="submit" value="LOGIN" disabled={ authenticated === mutations.AUTHENTICATING }  
            className="form-control mt-2 btn btn-primary btn-block" />
            {authenticated === mutations.NOT_AUTHENTICATED
            ? <p>Username or Password is incorrect</p>
            : null
            }
        </form>
    </div>
);

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    authenticateUser(e) {
        e.preventDefault();
        const username = e.target['username'].value;
        const password = e.target['password'].value;
        dispatch(mutations.requestAuthenticateUser(username, password));
    }
});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
