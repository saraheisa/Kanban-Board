import React from "react";
import { connect } from "react-redux";

export const TaskDetails = (
    id,
    comments,
    task,
    isComplete
) => (
    <div>Task Details</div>
);

const mapStateToProps = state => state;

export const ConnectedTaskDetails = connect(mapStateToProps)(TaskDetails);
