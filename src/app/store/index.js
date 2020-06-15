import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import * as sagas from './sagas.mock';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    combineReducers({
        tasks(tasks = defaultState.tasks, action) {
            switch (action.type) {
                case mutations.CREATE_TASK:
                    return [ ...tasks, {
                            name: 'brand new task',
                            id: action.taskId,
                            group: action.groupId,
                            owner: action.ownerId,
                            isComplete: false
                    }];
                case mutations.SET_TASK_NAME:
                    return tasks.map(task => {
                        if (task.id === action.taskId) {
                            task.name = action.name;
                        }
                        return task;
                    });
                case mutations.SET_TASK_GROUP:
                    return tasks.map(task => {
                        if (task.id === action.taskId) {
                            task.group = action.group;
                        }
                        return task;
                    });
                case mutations.SET_TASK_COMPLETION:
                    return tasks.map(task => {
                        if (task.id === action.taskId) {
                            task.isComplete = action.isComplete;
                        }
                        return task;
                    });
            }
            return tasks;
        },
        groups(groups = defaultState.groups){
            return groups;
        },
        comments(comments = defaultState.comments){
            return comments;
        },
        users(users = defaultState.users){
            return users;
        }
    }),
    applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
    sagaMiddleware.run(sagas[saga]);
}
