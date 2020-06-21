import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./taskList";

export const Dashboard = ({groups})=> (
    <div className="row">
        {groups.map (group => (
            <div key={group.id}>
                <ConnectedTaskList id={group.id} name={group.name} className="col"/>
            </div>
        ))}
    </div>
)

const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
