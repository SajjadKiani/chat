import App from "../App";
import Login from "../pages/login";
import Signup from "../pages/signup";

export const Routes = [
    {path: '/', component: App, exact: true},
    {path: '/login', component: Login, exact: false},
    {path: '/signup', component: Signup, exact: false},
]