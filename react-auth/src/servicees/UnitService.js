import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/unit";

class UnitService {

    getunit(){
        return axios.get(User_API_BASE_URL);
    }
    createunit(unit){
        return axios.post(User_API_BASE_URL, unit);
    }
    getunitById(unitId){
        return axios.get(User_API_BASE_URL + '/' + unitId);
    }

    updateunit(unit, unitId){
        return axios.put(User_API_BASE_URL + '/' + unitId, unit);
    }
    deletenit(userId){
        return axios.delete(User_API_BASE_URL + '/' + userId);
    }
    collaborators(user){
        return axios.get(User_API_BASE_URL + '/solde/' +user);
    }
    team(user){
        return axios.get(User_API_BASE_URL + '/team/' +user);
    }
}

export default new UnitService()