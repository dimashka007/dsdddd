import axios from 'axios';

const url = '/api/eduprocess/';

class EduprocessService {
    static getProcess(user){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url, {
                    params: {
                        user: user
                    }
                });
                const data = res.data;
                resolve(
                    res.data
                );
            } catch(err) {
                reject(err);
            }
        });
    }

    //Create Post
    static insertProcess(amount, term, type, user) {
        return axios.post(url, {amount, term, type, params:{
            user: user
        }});
    }
    static deleteProcess(id, user) {
        return axios.delete(`${url}${id}`,{ data: { user: user } });
    }
}

export default EduprocessService;