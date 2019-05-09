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
    static insertDisc(collection, name) {
        console.log(name)
        return axios.post(url, {collection, name});
    }
    // static deleteTeach(id, dir){
    //     return axios.delete(`${url}${id}`, {data:{dir: dir}});
    // }
}

export default MarksService;