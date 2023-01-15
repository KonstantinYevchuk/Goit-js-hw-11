// https://pixabay.com/api/?key=32830280-cd5d8cae887a4565b5001e89e&q=yellow+flowers&image_type=photo
async function fetchMake(name) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '32830280-cd5d8cae887a4565b5001e89e';
    
    const search = await fetch(`${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`);
    if(!search.ok) {
        throw new Error(search.textStatus)
    }
    const resp = await search.json();
    return resp
}


export { fetchMake };