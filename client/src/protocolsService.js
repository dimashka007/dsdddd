import axios from 'axios';

const url = '/api/protocols/';

class ProtocolsService {
    // Get Posts
    static getProtocols(folder){
        return axios.get(url+folder)
    }

    //Create Post
    static DeleteProtocol(name) {
        return axios.post(url, {name}).then(function (response) {
            return(response);
          });
    }

    //Delete Post
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default ProtocolsService;