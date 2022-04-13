import React from 'react';
import ReactDOM from 'react-dom';

import './style.css'
import MyThemeProvider from "./contexts/theme";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Routes} from "./routes";
import {AuthProvider} from "./contexts/auth";
import SocketProvider from "./contexts/webSocket";

ReactDOM.render(
    <AuthProvider>
        <MyThemeProvider>
            <SocketProvider>
                <BrowserRouter basename='chat/'>
                    <Switch>
                        {Routes.map((props,i) =>
                            <Route {...props} key={i} />
                        )}
                    </Switch>
                </BrowserRouter>
            </SocketProvider>
        </MyThemeProvider>
    </AuthProvider>
  ,document.getElementById('root')
);