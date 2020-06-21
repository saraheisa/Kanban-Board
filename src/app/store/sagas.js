import {
    take,
    put,
    select
} from 'redux-saga/effects';
import uuid from 'uuid';
import axios from 'axios';
import * as mutations from './mutations';
import { history } from './history';
import md5 from 'md5'

const URL = process.env.NODE_ENV == 'production' ? '' : 'http://localhost:3000';

export function* taskCreationSaga() {
    while (true) {
        const { groupId } = yield take(mutations.REQUEST_TASK_CREATION);
        const taskId = uuid();
        const ownerId = 'U1'
        yield put(mutations.createTask(taskId, groupId, ownerId));
        const { res } = yield axios.post(URL + '/task/new', {
            task: {
                id: taskId,
                group: groupId,
                owner: ownerId,
                name: 'New Task',
                isComplete: false
            }
        });
        console.log(res);
    }
}

export function* taskModificationSaga() {
    while (true) {
        const task = yield take([
            mutations.SET_TASK_COMPLETION,
            mutations.SET_TASK_GROUP,
            mutations.SET_TASK_NAME
         ]);

        const { res } = yield axios.post(URL + '/task/update', {
            task: {
                id: task.taskId,
                group: task.groupId,
                owner: task.ownerId,
                name: task.name,
                isComplete: task.isComplete
            }
        });
        console.log(res);
    }
}

export function* authenticateUserSaga() {
    while (true) {
        const { username, password } = yield take(mutations.REQUEST_AUTHENTICATE_USER);
        try {
            const res = yield axios.post(URL + '/authenticate', {
                username,
                password
            });
            if (!res) {
                throw new Error('failed to authenticate!');
            }
            yield put(mutations.setState(res.data.state));
            yield put(mutations.AUTHENTICATED);

            // move to dashboard
            history.push('/dashboard');

        } catch (error) {
            console.log(error);
            yield put(mutations.processingAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }

    }
}

export function* commentCreationSaga() {
    while (true) {
        const { owner, task, content } = yield take(mutations.REQUEST_COMMENT_CREATION);
        const id = uuid();
        const { res } = yield axios.post(URL + '/comment/new', {
            comment: {
                id,
                owner,
                task,
                content
            }
        });
        yield put(mutations.createComment(id, owner, task, content));
    }
}

export function* createUserSaga() {
    while (true) {
        const { name, password } = yield take(mutations.REQUEST_USER_CREATION);
        const id = uuid();
        const passwordHash = md5(password);
        try {
            const res = yield axios.post(URL + '/signup', {
                user: {
                    id,
                    name,
                    passwordHash
                }
            });
            if (!res) {
                throw new Error('failed to authenticate!');
            }
            yield put(mutations.setState(res.data.state));
            yield put(mutations.AUTHENTICATED);

            // move to dashboard
            history.push('/dashboard');

        } catch (error) {
            console.log(error);
            yield put(mutations.processingAuthenticateUser(mutations.NOT_AUTHENTICATED));
        }

    }
}
