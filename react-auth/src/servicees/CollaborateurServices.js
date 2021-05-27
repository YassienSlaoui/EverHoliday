import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/collaborator";
axios.interceptors.request.use( config => {
    const token = sessionStorage.getItem('token');
    if(token){
      const token1 = 'Bearer ' + token;
      config.headers.Authorization =  token1;
    }
  
    return config;
  });
class collaboratorService {
     getUser(){
        return  axios.get(User_API_BASE_URL);
    }
    createUser(user){
        return axios.post(User_API_BASE_URL, user);
    }
    getUserByUsername(username){
         return axios.get(User_API_BASE_URL + '/findbyname/' + username);
    }
    getUserByEmail(email){
         return axios.get(User_API_BASE_URL + '/email/' + email);
    }
    getUserById(userId){
        return axios.get(User_API_BASE_URL + '/' + userId);
    }
    updateUser(user, userId){
        return axios.put(User_API_BASE_URL + '/' + userId, user);
    }
    deleteUser(userId){
        return axios.delete(User_API_BASE_URL + '/' + userId);
    }
    login(username,password){
        return axios.post(User_API_BASE_URL + '/login',{username,password});
    }
    password(user,userId){
        return axios.put(User_API_BASE_URL + '/password/'+userId, user);
    }
}

export default new collaboratorService()