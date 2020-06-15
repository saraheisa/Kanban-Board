import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import * as mutations from "../store/mutations";

export const TaskDetails = ({
    id,
    comments,
    task,
    groups,
    isComplete,
    setTaskCompletion,
    setTaskName,
    setTaskGroup,
}) => (
    <div>
        <div>
            <input type="text" value={task.name} onChange={setTaskName}/>
        </div>
        <div>
            <button onClick={() => {setTaskCompletion(id, !isComplete)}}>
                { isComplete? `Reopen` : `Complete` }
            </button>
        </div>
        <div>
            <select onChange={setTaskGroup} value={task.group}>
                {groups.map(group => (
                    <option value={group.id} key={group.id}>{group.name}</option>
                ))}
            </select>
        </div>
        <div>
            <Link to="/dashboard">
                <button>Done</button>
            </Link>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    let task = state.tasks.find(task => task.id === id);
    console.log(`task from props`);
    console.log(task);
    let groups = state.groups;
    let comments = state.comments.filter(comment => comment.task === id);
    return {
        id,
        comments,
        task,
        groups,
        isComplete: task.isComplete
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        setTaskCompletion (id, isComplete) {
            dispatch(mutations.setTaskCompletion(id, isComplete));
        },
        setTaskName (e) {
            dispatch(mutations.setTaskName(id, e.target.value));
        },
        setTaskGroup (e) {
            dispatch(mutations.setTaskGroup(id, e.target.value));
        }
    }
};

export const ConnectedTaskDetails = connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
