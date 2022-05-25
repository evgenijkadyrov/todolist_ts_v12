import React from 'react'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "../api/todolist-api";
import {TodolistList} from "../features/TodolistList";
import {ErrorSnackBar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useSelector} from "react-redux";
import {RequestStatusType} from "../api/app-reducer";
import {AppRootStateType} from "./store";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (

        <div className="App">
            <ErrorSnackBar/>
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
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList />}/>
                    <Route path={'login'} element={<Login />}/>
                    <Route path={'/404'} element={<h1>404: Page not found</h1>}/>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>

                </Routes>
            </Container>
        </div>
    );
}

export default AppWithRedux;
