import axios from 'axios';

const url = 'http://pulpitpis.herokuapp.com/api/courseworks/';

class CourseworksService {
    // Get Posts
    static getCourseworks(value){
        return axios.get(url + value)
    }

    //Create Post
    static DeleteCourseworks(name, folder) {
        return axios.post(url, {name, folder}).then(function (response) {
            return(response);
          });
    }

    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default CourseworksService;