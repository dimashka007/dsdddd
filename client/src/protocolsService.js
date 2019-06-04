import axios from 'axios';

const url = 'http://pulpitpis.herokuapp.com/api/protocols/';

class ProtocolsService {
    // Get Posts
    static getProtocols(){
        return axios.get(url)
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