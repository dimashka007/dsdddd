import axios from 'axios';

const url = '/api/exams/';

class ExamsService {
    // Get Posts
    static getExams(value){
        return axios.get(url + value)
    }

    //Create Post
    static DeleteFile(name, folder) {
        return axios.post(url, {name, folder}).then(function (response) {
            return(response);
          });
    }

    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ExamsService;