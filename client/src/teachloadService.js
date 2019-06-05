import axios from 'axios';

const url = '/api/teachload/';

class GraphicsService {
    //Create Post
    static getTable(folder) {
        return axios.post(url, {folder}).then(function (response) {
            return(response);
          });
    }
    static deleteTable(folder) {
        return axios.post(url+'delete', {folder}).then(function (response) {
            return(response);
          });
    }
}

export default GraphicsService;