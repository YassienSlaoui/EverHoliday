import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/PaidRequest";

class PaidRequestService {

    getPaidRequest(){
        return axios.get(User_API_BASE_URL);
    }
    createPaidRequest(PaidRequest){
        return axios.post(User_API_BASE_URL, PaidRequest);
    }
    getPaidRequestById(PaidRequestId){
        return axios.get(User_API_BASE_URL + '/' + PaidRequestId);
    }

    updatPaidRequest(PaidRequest, PaidRequestId){
        return axios.put(User_API_BASE_URL + '/' + PaidRequestId, PaidRequest);
    }
    
    deletPaidRequest(id){
        return axios.delete(User_API_BASE_URL + '/' + id);
    }
    statut(PaidRequest,PaidRequestId){
        return axios.put(User_API_BASE_URL + '/statut/'+PaidRequestId, PaidRequest);
    }
}

export default new PaidRequestService()