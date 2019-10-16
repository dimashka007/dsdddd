import axios from 'axios';

const url = '/api/groups/';

class groupsService {
    static getGroups(){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    res.data
                );
            } catch(err) {
                reject(err);
            }
        });
    }
    static insertGroup(name){
        return axios.post(url, {name})
    }
}

export default groupsService;