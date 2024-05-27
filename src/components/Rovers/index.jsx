import { API_KEY } from '../../API_KEYS';

export const rovers = {
  perseverance: {
    name: 'perseverance',
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/latest_photos?&api_key=${API_KEY}`,
  },
  curiosity: 'curiosity',
};
