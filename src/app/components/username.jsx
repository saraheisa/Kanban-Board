import React from "react";
import { connect } from "react-redux";

export const Username = ( {username} ) => (
    <h3 className="">Welcome {username}!</h3>
);

const mapStateToProps = (state, ownProps) => {
    const username = state.users.name;
    return {
        username
    };
};

export const ConnectedUsername = connect(mapStateToProps)(Username);
