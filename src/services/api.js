import axios from "axios";

const servicePath = 'http://188.121.109.219:8000/app/'
const wsPath = `ws://192.168.1.106:8000/ws/chat?token=`


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