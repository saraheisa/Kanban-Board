import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";

export const TrackList = ({id, tasks, name, createNewTask})=> (
    <div>
        <h3>{name}</h3>
        {tasks.map(task => (
            <div key={task.id}> {task.name} </div>
        ))}
        <button onClick={() => createNewTask(id) }>Add New</button>
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
            console.log(`added task to group ${id}`);
            dispatch(requestTaskCreation(id));
        }
    }
};

export const ConnectedTaskList = connect(mapStateToProps, mapDispatchToProps)(TrackList);
