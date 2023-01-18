// https://pixabay.com/api/?key=32830280-cd5d8cae887a4565b5001e89e&q=yellow+flowers&image_type=photo

const axios = require('axios').default;

async function fetchMake(name, page = 1) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32830280-cd5d8cae887a4565b5001e89e';
    try {
        const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
        const resp = await response.data;
    return resp
    
    } catch(err) {
        console.log(err);
    }
    
}


export { fetchMake };


// async function getUser() {
//     try {
//       const response = await axios.get('/user?ID=12345');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }