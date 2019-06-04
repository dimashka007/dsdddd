import axios from 'axios';

const url = 'http://pulpitpis.herokuapp.com/api/graphics/';

class GraphicsService {
    // Get Posts
    static getGraphics(value){
        return axios.get(url + value)
    }

    //Create Post
    static DeleteGraphics(folder) {
        return axios.post(url, {folder}).then(function (response) {
            return(response);
          });
    }

    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default GraphicsService;