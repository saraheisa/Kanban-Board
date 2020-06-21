import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from 'react-router-dom';

export const TrackList = ({id, tasks, name, createNewTask, comments, userId})=> (
    <div className="card p-2 m-2">
        <h3>{name}</h3>
        {tasks.map(task => (
            <Link to={`/tasks/${task.id}`} key={task.id}>
                <div className="card p-2 mt-2"> {task.name} 
                 ({comments.filter(comment => comment.task === task.id).length}) 
                {task.isComplete? ' ✅' : ''}</div>
            </Link>
        ))}
        <button onClick={() => createNewTask(id, userId) } className="btn btn-primary btn-block mt-2">
            Add New</button>
    </div>
)

const mapStateToProps = (state, ownProps)=> {
    const groupId = ownProps.id;
    return {
        name: ownProps.name,
        id: groupId,
        tasks: state.tasks.filter(task => task.group === groupId),
        comments: state.comments,
        userId: state.users.id
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewTask (id, userId) {
            dispatch(requestTaskCreation(id, userId));
        }
    }
};

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TrackList);
