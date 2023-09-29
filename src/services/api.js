import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (search, page) => {
    const API_KEY = "38534343-83a5af4ee16ad6e7691f4452e";
    // const queryValue = search.indexOf('/');
    // const queryText = search.slice(queryValue + 1, search.length);
    const searchParams = new URLSearchParams({
        key: API_KEY,
        //  q: {queryText},
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 12
    })
    const response = await axios.get(`?${searchParams}`) 
    return response.data;   
}
