import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/auth";

class AuthService {

    login(username,password){
        return axios.post(User_API_BASE_URL,{username,password});
    }
    user(username,password){
        return axios.post(User_API_BASE_URL+"/user",{username,password});
    }
    role(username,password){
        return axios.post(User_API_BASE_URL+"/role",{username,password});
    }
}

export default new AuthService()