import React from 'react';
import ReactDOM from 'react-dom';

import './style.css'
import MyThemeProvider from "./contexts/theme";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Routes} from "./routes";
import {AuthProvider} from "./contexts/auth";

ReactDOM.render(
    <AuthProvider>
        <MyThemeProvider>
            <BrowserRouter>
                <Switch>
                    {Routes.map((props,i) =>
                        <Route {...props} key={i} />
                    )}
                </Switch>
            </BrowserRouter>
        </MyThemeProvider>
    </AuthProvider>
  ,document.getElementById('root')
);