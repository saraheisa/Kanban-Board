import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from 'react-router-dom';

export const TrackList = ({id, tasks, name, createNewTask})=> (
    <div className="card p-2 m-2">
        <h3>{name}</h3>
        {tasks.map(task => (
            <Link to={`/tasks/${task.id}`} key={task.id}>
                <div className="card p-2 mt-2"> {task.name} </div>
            </Link>
        ))}
        <button onClick={() => createNewTask(id) } className="btn btn-primary btn-block mt-2">
            Add New</button>
    </div>
)

const mapStateToProps = (state, ownProps)=> {
    const groupId = ownProps.id;
    return {
        name: ownProps.name,
        id: groupId,
        tasks: state.tasks.filter(task => task.group === groupId)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        createNewTask (id) {
            dispatch(requestTaskCreation(id));
        }
    }
};

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TrackList);
