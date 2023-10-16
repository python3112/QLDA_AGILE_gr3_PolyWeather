import axios from 'axios';

const fetchWeatherForecast = async (address) => {
  if(address ==  undefined){
    address = 'hanoi';
  }
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: address,
      days: '3'
    },
    headers: {
      'X-RapidAPI-Key': '92ace59e7bmshe5979c41887fecap18d822jsna8219e1eb828',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data; 
  } catch (error) {
    throw new Error('Failed to load weather data');
  }
};

export {  fetchWeatherForecast};
