import React from "react";
import { connect } from "react-redux";
import * as mutations from '../store/mutations';

export const Signup = ( { createUser, authenticated } ) => (
    <div className="card p-3 col-6">
        <h2>SIGNUP</h2>
        <form onSubmit={createUser}>
            <input type="text" name="name" id="name" placeholder="Username" className="form-control"/>
            <input type="password" name="password" id="password" placeholder="password" className="form-control mt-2"/>
            <input type="submit" value="LOGIN" disabled={ authenticated === mutations.AUTHENTICATING }  
            className="form-control mt-2 btn btn-primary btn-block" />
            {authenticated === mutations.NOT_AUTHENTICATED
            ? <p>Something Wrong Happened. try again!</p>
            : null
            }
        </form>
    </div>
);

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated
});

const mapDispatchToProps = (dispatch) => ({
    createUser(e) {
        e.preventDefault();
        const name = e.target['name'].value;
        const password = e.target['password'].value;
        dispatch(mutations.requestUserCreation(name, password));
    }
});

export const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup);
