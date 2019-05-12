import axios from 'axios';

const url = 'http://localhost:5000/api/marks/';

class MarksService {
    static getDisc(name){
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url, {
                    params: {
                        user: name,
                        type: 'Disc'
                    }
                });
                resolve(
                    res.data
                );
            } catch(err) {
                reject(err);
            }
        });
    }
    static insertTask(type, date, theme, task, name, way){
        return axios.post(url+'date', {type, date, theme, task, name, way})
    }
    static insertStudent(type, student, marks, name, way){
        return axios.post(url+'student', {type, student, marks, name, way})
    }
    //Create Post
    static insertDisc(collection, name) {
        return axios.post(url, {collection, name});
    }
    // static deleteTeach(id, dir){
    //     return axios.delete(`${url}${id}`, {data:{dir: dir}});
    // }
}

export default MarksService;