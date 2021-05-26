import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/RecoveryRequest";

class RecoveryRequestService {

    getRecoveryRequest(){
        return axios.get(User_API_BASE_URL);
    }
    createRecoveryRequest(PaidRequest){
        return axios.post(User_API_BASE_URL, PaidRequest);
    }
    getRecoveryRequestById(PaidRequestId){
        return axios.get(User_API_BASE_URL + '/' + PaidRequestId);
    }

    updatRecoveryRequest(PaidRequest, PaidRequestId){
        return axios.put(User_API_BASE_URL + '/' + PaidRequestId, PaidRequest);
    }
    
    deletRecoveryRequest(id){
        return axios.delete(User_API_BASE_URL + '/' + id);
    }
    statut(PaidRequest,PaidRequestId){
        return axios.put(User_API_BASE_URL + '/statut/'+PaidRequestId, PaidRequest);
    }
}

export default new RecoveryRequestService()