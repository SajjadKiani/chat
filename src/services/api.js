import axios from "axios";

const servicePath = 'http://localhost:8001/app/'
const wsPath = `ws://localhost:8001/ws/chat?token=`


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

export const wsAPI = (user) => new WebSocket(wsPath+user);