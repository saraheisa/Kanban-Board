import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

export const TaskDetails = ({
    id,
    comments,
    task,
    groups,
    isComplete
}) => (
    <div>
        <div>
            <input type="text" value={task.name}/>
        </div>
        <div>
            <button>
                Complete/Reopen
            </button>
        </div>
        <div>
            <select>
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

export const ConnectedTaskDetails = connect(mapStateToProps)(TaskDetails);
