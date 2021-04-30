import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/ExeptionnelRequest";

class ExeptionnelRequestService {

    geExeptionnelRequest(){
        return axios.get(User_API_BASE_URL);
    }
    creatExeptionnelRequest(ExeptionnelRequest){
        return axios.post(User_API_BASE_URL, ExeptionnelRequest);
    }
    getExeptionnelRequestById(ExeptionnelRequestId){
        return axios.get(User_API_BASE_URL + '/' + ExeptionnelRequestId);
    }

    updatExeptionnelRequest(ExeptionnelRequest, ExeptionnelRequestId){
        return axios.put(User_API_BASE_URL + '/' + ExeptionnelRequestId, ExeptionnelRequest);
    }
    
    deletExeptionnelRequest(id){
        return axios.delete(User_API_BASE_URL + '/' + id);
    }
    statut(ExeptionnelRequest,ExeptionnelRequestId){
        return axios.put(User_API_BASE_URL + '/statut/'+ExeptionnelRequestId, ExeptionnelRequest);
    }
}

export default new ExeptionnelRequestService()