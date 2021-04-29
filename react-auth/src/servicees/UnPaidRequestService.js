import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/UnpaidRequest";

class UnPaidRequestService {

    getUnPaidRequest(){
        return axios.get(User_API_BASE_URL);
    }
    createUnPaidRequest(PaidRequest){
        return axios.post(User_API_BASE_URL, PaidRequest);
    }
    getUnPaidRequestById(PaidRequestId){
        return axios.get(User_API_BASE_URL + '/' + PaidRequestId);
    }

    updatUnPaidRequest(PaidRequest, PaidRequestId){
        return axios.put(User_API_BASE_URL + '/' + PaidRequestId, PaidRequest);
    }
    
    deletUnPaidRequest(id){
        return axios.delete(User_API_BASE_URL + '/' + id);
    }
    statut(PaidRequest,PaidRequestId){
        return axios.put(User_API_BASE_URL + '/statut/'+PaidRequestId, PaidRequest);
    }
}

export default new UnPaidRequestService()