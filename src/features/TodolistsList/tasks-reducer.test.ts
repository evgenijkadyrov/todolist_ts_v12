import {
    addTaskAC,
    changeTaskAC,

    removeTaskAC,
    setTasksAC,
    tasksReducer
} from './tasks-reducer';
import {TasksStateType} from '../../app/App';
import {addTodolistAC, removeTodolistAC, setTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "2",
                title: "JS",
                status: TaskStatuses.Completed,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId1'
            },
            {
                id: "3",
                title: "React",
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId1'
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "2",
                title: "milk",
                status: TaskStatuses.Completed,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId2'
            },
            {
                id: "3",
                title: "tea",
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                addedDate: '',
                deadline: '',
                order: 2,
                startDate: '',
                todoListId: 'todolistId2'
            }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    let task={
        description: 'string',
        title: 'string',
        completed: true,
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: 'string',
        deadline: 'string',
        id: 'string',
        todoListId: 'todolistId2',
        order: 2,
        addedDate: 'string'
    }
    const action = addTaskAC(task);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe(task.title);
    expect(endState["todolistId2"][0].status).toBe(task.status);
});
test('status of specified task should be changed', () => {
    const action = changeTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = changeTaskAC("2", {title: "yogurt"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({
        id: 'sdsd',
        title: 'ddddd',
        order: 0,
        addedDate: 'sddd'
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty array should be added when todolist set', () => {
    const action = setTodolistAC([
        {id: '1', title: '1', order: 2, addedDate: ''},
        {id: '2', title: '1', order: 2, addedDate: ''}
    ]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);

});

test('set tasks to todolists from redux', () => {
    const action = setTasksAC([{
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: '',
        completed: true,
        priority: TaskPriorities.Low,
        addedDate: '',
        deadline: '',
        order: 2,
        startDate: '',
        todoListId: 'todolistId2'
    },
        {
            id: "2",
            title: "milk",
            status: TaskStatuses.Completed,
            description: '',
            completed: true,
            priority: TaskPriorities.Low,
            addedDate: '',
            deadline: '',
            order: 2,
            startDate: '',
            todoListId: 'todolistId2'
        }], 'todolistId2')
    const endState = tasksReducer({'todolistId1': [], 'todolistId2': []}, action)

    expect(endState['todolistId2'][1].title).toBe('milk')
})
