import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/solde";

class BoldeService {

    getUserById(userId){
        return axios.get(User_API_BASE_URL + '/' + userId);
    }

    getUserById(balance){
        return axios.get(User_API_BASE_URL + '/' + balance);
    }
    deleteBalance(userId){
        return axios.delete(User_API_BASE_URL + '/' + userId);
    }
   

}

export default new BoldeService()