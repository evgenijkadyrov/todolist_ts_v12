import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all",addedDate:'', order:2,entityStatus:'idle'},
        {id: todolistId2, title: "What to buy", filter: "all",addedDate:'', order:2, entityStatus:'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist= {   addedDate:'d',
        order:2,title:'fgfg',id:'dd'}

    const endState = todolistsReducer(startState, addTodolistAC(todolist))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
test ('set todolists',()=>{
    const todolists=startState
    const endState=todolistsReducer([],setTodolistAC(todolists))


expect(endState.length).toBe(2)
expect(endState[0].title).toBe('What to learn')
})