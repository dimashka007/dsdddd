import axios from 'axios';

const url = 'http://localhost:5000/api/methodicals/';

class MethodicalsService {
    static getMeth(){
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

    //Create Post
    static insertMeth(name, course, semester, discipline) {
        return axios.post(url, {name, course, semester, discipline});
    }
    static deleteMeth(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default MethodicalsService;