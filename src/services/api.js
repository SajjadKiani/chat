import axios from "axios";

const servicePath = 'http://127.0.0.1:8000/app/'
const wsPath = `ws://127.0.0.1:8000/ws/chat`


export const LoginAPI = (data) =>
    axios.post(`${servicePath}login/`,data)

export const SignupAPI = (data) =>
    axios.post(`${servicePath}signup/`,data)

export const LogoutAPI = (user) =>
    axios
        .post(`${servicePath}logout/`,[],{
            headers: {
                'Authorization': `Token ${user}`,
            }
        })

export const UsersListAPI = (user) =>
    axios
        .get(`${servicePath}users/`,{
            headers: {
                'Authorization': `token ${user}`
            }
        })

export const MessageListAPI = (user,data) =>
    axios
        .post(`${servicePath}messages/`,{receiver: data},{
            headers: {
                'Authorization': `Token ${user}`
            }
        })

export const wsAPI = () => new WebSocket(wsPath);