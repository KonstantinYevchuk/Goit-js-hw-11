// async function getUser() {
//     try {
//       const response = await axios.get('/user?ID=12345');
//       console.log(response);
//     } catch (error) {
//       console.error(error);
//     }
//   }
import Notiflix from 'notiflix';
const axios = require('axios').default;
import { fetchMake } from './fetchFhotos';

const formEl = document.querySelector("#search-form");
formEl.addEventListener('submit', submitEvent);

function submitEvent(evt) {
    evt.preventDefault()
    const { searchQuery
    } = evt.currentTarget;
    console.log(searchQuery.value);
    fetchMake(searchQuery.value).then(resp => {
        
        console.log(resp);
    })
    .catch(error => {
        console.log(error);
    })
}


