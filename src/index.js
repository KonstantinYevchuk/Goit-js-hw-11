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

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector("#search-form");
const loadBtn = document.querySelector('.load-more')
formEl.addEventListener('submit', submitEvent);

let page = 1;
async function submitEvent(evt) {
    evt.preventDefault()
    
    const { searchQuery
    } = evt.currentTarget;
    galleryEl.innerHTML = "";
    // evt.currentTarget.reset();
    // console.log(searchQuery.value);
    try {
        const resultFetch = await fetchMake(searchQuery.value.trim())
        console.log(resultFetch.hits);
        if(resultFetch.hits.length === 0) {
            Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."')
        }

        createMarkup(resultFetch.hits)
        loadBtn.hidden = false;
        
    } catch(error) {
     console.log(error);
    }
    
}

loadBtn.addEventListener('click', clickEvent);

async function clickEvent(evt) {
    evt = await fetchMake(); 
}



function createMarkup(arr) {
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>  
    `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250px" height="180px" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${downloads}</b>
      </p>
    </div>
  </div>`).join('');

   galleryEl.insertAdjacentHTML('beforeend', markup);     
    
}
