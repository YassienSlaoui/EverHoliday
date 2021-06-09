import axios from 'axios';

const User_API_BASE_URL = "http://localhost:8083/rest/neo4j/forgotpass";

class ForgotService {

    /*requestforgot(email){
        return axios.post(User_API_BASE_URL,{email});
    }*/
    requestforgot(email){
        return axios.get(User_API_BASE_URL+"/email/"+email);
    }
}

export default new ForgotService()