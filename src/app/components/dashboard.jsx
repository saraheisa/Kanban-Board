import React from "react";
import { connect } from "react-redux";

export const Dashboard = ({groups})=> (
    <div>
        <h2>Dashboard</h2>
    </div>
)

const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
