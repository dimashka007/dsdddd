import axios from 'axios';

const url = 'http://pulpit.herokuapp.com/api/teachers/';

class TeachersService {
    static getTeach(){
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
    static insertTeach(name, login, password) {
        return axios.post(url, {name, login, password});
    }
    static deleteTeach(id, dir){
        return axios.delete(`${url}${id}`, {data:{dir: dir}});
    }
}

export default TeachersService;