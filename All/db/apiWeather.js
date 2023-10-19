import axios from 'axios';

const fetchWeatherForecast = async (address) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q: address,
      days: '3'
    },
    // X-RapidAPI-Key thay thế nếu chết api
    // 92ace59e7bmshe5979c41887fecap18d822jsna8219e1eb828
    // a3c3768a83msh0d40f6de0ee49d4p12552fjsn4061d1039af8
    // 38bcf64b0cmshe951adb4b63823ep1ea174jsn1af92d61d42a
    headers: {
      'X-RapidAPI-Key': '38bcf64b0cmshe951adb4b63823ep1ea174jsn1af92d61d42a',
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
