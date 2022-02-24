import App from "../App";
import Login from "../pages/login";
import Signup from "../pages/signup";
import Home from "../pages/home";

export const Routes = [
    // {path: '/', component: Home, exact: true},
    {path: '/', component: App, exact: true},
    {path: '/login', component: Login, exact: false},
    {path: '/signup', component: Signup, exact: false},
]