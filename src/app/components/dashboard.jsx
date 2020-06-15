import React from "react";
import { connect } from "react-redux";

export const Dashboard = ({groups})=> (
    <div>
        <h2>Dashboard</h2>
        {groups.map (group => (
            <div>
                {group.name}
            </div>
        ))}
    </div>
)

const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
