import React from "react";
import { connect } from "react-redux";

export const Login = () => (
    <div>
        <h2>LOGIN!!!</h2>
        <form>
            <input type="text" name="username" id="username" placeholder="Username"/>
            <input type="password" name="password" id="password" placeholder="password"/>
            <input type="submit" value="LOGIN"/>
        </form>
    </div>
);

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch) => ({});

export const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);
