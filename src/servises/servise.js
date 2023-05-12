import axios from 'axios';
import { BASE_URL, API_KEY } from './api';

const baseSearchParams = {
  per_page: 3,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};

export async function fetchPictures(inputValue = 'spider', page = 1) {
  return await axios
    .get(`${BASE_URL}/`, {
      params: {
        page: page,
        q: inputValue,
        key: API_KEY,
        ...baseSearchParams,
      },
    })
    .then(response => response.data);
}
