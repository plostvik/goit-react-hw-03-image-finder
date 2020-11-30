import axios from 'axios';

const key = '18943342-b8026c260dd173166ae4011d3';

const fetchImages = (searchQuery, page = 1) => {
  const apiUrl = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=12&key=${key}`;
  return axios.get(apiUrl).then(response => {
    return response.data;
  });
};

export default fetchImages;
