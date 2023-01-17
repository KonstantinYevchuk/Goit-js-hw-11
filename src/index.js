
import Notiflix from 'notiflix';
const axios = require('axios').default;
import { fetchMake } from './fetchFhotos';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const formEl = document.querySelector("#search-form");
const loadBtn = document.querySelector('.load-more')
formEl.addEventListener('submit', submitEvent);

let page = 1;
let searchFhoto = '';
async function submitEvent(evt) {
    evt.preventDefault()
    
    searchFhoto = evt.currentTarget.elements.searchQuery.value;
    galleryEl.innerHTML = "";
    evt.currentTarget.reset();
    loadBtn.hidden = true;
    await fetchMake(searchFhoto.trim()).then(response => {
        
        if(response.length === 0 || searchFhoto.trim() === "") {
            Notiflix.Notify.failure('"Sorry, there are no images matching your search query. Please try again."');
            loadBtn.hidden = true;
            return
            
        } else if(response.hits.length < 40) {
            loadBtn.hidden = true;
            Notiflix.Notify.info("We're sorry, it's all that we have on your request.")
            createMarkup(response.hits)
        } else {
            Notiflix.Notify.success(`Hooray! We found totalHits images: ${response.totalHits}`) 
            createMarkup(response.hits)
            loadBtn.hidden = false; 
            console.log(response.hits);
        }
        
    })
    .catch(error => console.log(error))  
    
}

loadBtn.addEventListener('click', clickEvent);
async function clickEvent() {
    page += 1;
    await fetchMake(searchFhoto, page).then(data => {
            // console.log(data);
             createMarkup(data.hits);
             loadBtn.hidden = false;       
    })
    .catch(err => {
        console.log(err);
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
        loadBtn.hidden = true;
    })
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
      });
}


function createMarkup(arr) {
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>  
    `<div class="photo-card">
    <a href="${largeImageURL}" class="gallery_item">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250px" height="180px" /></a>
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
   gallery.refresh()
}
var gallery = new SimpleLightbox('.gallery_item', { 
    captionsData: "alt",
    captionPosotion: 'bottom',
    captionDaley: 250
  });

// window.addEventListener('scroll', () => {
//     const { height: cardHeight } = document
//     .querySelector(".gallery")
//     .firstElementChild.getBoundingClientRect();
    
//     window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//       });
// })

