export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    Promise.reject(`Error: ${res.status}`);
  }
};

export const filterWeatherData = (data) => {
  const seconds = Date.now() / 1000;
  const result = {};
  const conditionCode = data.weather[0].id;
  const timeOfDay =
    data.sys.sunrise <= seconds && data.sys.sunset >= seconds ? "day" : "night";

  result.city = data.name;
  result.temp = { F: Math.round(data.main.temp) };
  result.type =
    result.temp.F >= 86 ? "hot" : result.temp.F >= 66 ? "warm" : "cold";
  result.imageName = imageToDisplay(conditionCode, timeOfDay);
  result.temp.C = Math.round(((result.temp.F - 32) * 5) / 9);
  return result;
};

const imageToDisplay = (conditionCode, timeOfDay) => {
  let imageName = "";

  if (conditionCode == 800) {
    imageName += "clear";
  } else if (conditionCode > 800 && conditionCode < 900) {
    imageName += "cloudy";
  } else if (conditionCode >= 500 && conditionCode < 600) {
    imageName += "rain";
  } else if (conditionCode >= 200 && conditionCode < 300) {
    imageName += "storm";
  } else if (conditionCode >= 600 && conditionCode < 700) {
    imageName += "snow";
  } else if (conditionCode >= 700 && conditionCode < 800) {
    imageName += "fog";
  }

  imageName = timeOfDay === "day" ? imageName : (imageName += `_${timeOfDay}`);
  return imageName;
};
