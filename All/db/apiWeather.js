import axios from 'axios';

const fetchWeatherData = async () => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: 'hanoi'},
    headers: {
      'X-RapidAPI-Key': 'a3c3768a83msh0d40f6de0ee49d4p12552fjsn4061d1039af8',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load weather data'); 
  }
};

export default fetchWeatherData;
