import React from 'react'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistList} from "../features/TodolistList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "../api/app-reducer";
import {AppRootStateType} from "./store";




export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
const status=useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)

    return (
        <div className="App">
            <ErrorSnackBar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status==='loading' && <LinearProgress />}
            </AppBar>

            <Container fixed>
                <TodolistList/>
            </Container>
        </div>
    );
}

export default AppWithRedux;
