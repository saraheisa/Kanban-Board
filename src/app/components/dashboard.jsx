import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./taskList";

export const Dashboard = ({groups})=> (
    <div>
        <h2>Dashboard</h2>
        {groups.map (group => (
            <div>
                <ConnectedTaskList id={group.id} name={group.name}/>
            </div>
        ))}
    </div>
)

const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
