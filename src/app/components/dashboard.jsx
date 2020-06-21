import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList } from "./taskList";
import { ConnectedUsername } from './username';

export const Dashboard = ({groups})=> (
    <div>
        <ConnectedUsername />
        <div className="row">
            {groups.map (group => (
                <div key={group.id}>
                    <ConnectedTaskList id={group.id} name={group.name} className="col"/>
                </div>
            ))}
        </div>
    </div>
)

const mapStateToProps = ({groups})=>({groups});

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
