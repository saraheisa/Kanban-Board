export const REQUEST_TASK_CREATION = 'REQUEST_TASK_CREATION';
export const CREATE_TASK = 'CREATE_TASK';

export const requestTaskCreation = (groupId) => ({
    type: REQUEST_TASK_CREATION,
    groupId
});

export const createTask = (taskId, groupId, ownerId) => ({
        type: CREATE_TASK,
        taskId,
        groupId,
        ownerId
});
