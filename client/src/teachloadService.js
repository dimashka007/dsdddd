import axios from 'axios';

const url = 'http://localhost:5000/api/teachload/';

class GraphicsService {
    //Create Post
    static getTable(folder) {
        return axios.post(url, {folder}).then(function (response) {
            return(response);
          });
    }
}

export default GraphicsService;