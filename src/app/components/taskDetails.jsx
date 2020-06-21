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
    createComment,
    userId,
    username
}) => (
    <div className="card p-3 col-6">
        <div>
            <input type="text" value={task.name} onChange={setTaskName} className="form-control form-control-lg"/>
        </div>
        <div>
            <button onClick={() => {setTaskCompletion(id, !isComplete)}} className="btn btn-primary mt-2">
                { isComplete? `Reopen` : `Complete` }
            </button>
        </div>
        <div>
            <select onChange={setTaskGroup} value={task.group} className="form-control mt-2">
                {groups.map(group => (
                    <option value={group.id} key={group.id}>{group.name}</option>
                ))}
            </select>
        </div>
        <div className="mt-2">
            {comments.map(comment => (
                <p key={comment.id}>{username}: {comment.content}</p>
            ))}
        </div>
        <form className="mt-2" onSubmit={(e) => createComment(e, id, userId)}>
            <input type="text" name="comment" id="comment" placeholder="Enter Comment" className="form-control d-inline w-75"/>
            <input type="submit" value="Comment" className="btn btn-success ml-2"/>
        </form>
        <div>
            <Link to="/dashboard">
                <button className="btn btn-primary btn-block mt-2">Done</button>
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
    let userId = state.session.id;
    let username = state.users.name;
    return {
        id,
        comments,
        task,
        groups,
        isComplete: task.isComplete,
        userId,
        username
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
        },
        createComment (e, taskId, userId) {
            e.preventDefault();
            const comment = e.target['comment'].value;
            dispatch(mutations.requestCommentCreation(userId, taskId, comment));
        }
    }
};

export const ConnectedTaskDetails = connect(mapStateToProps, mapDispatchToProps)(TaskDetails);
