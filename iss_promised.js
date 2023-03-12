// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

const request = require('request-promise-native');

// const fetchMyIP = function() {
//   return request('https://api.ipify.org?format=json');
// };

// const fetchCoordsByIP = function(body) {
//   const ip = JSON.parse(body).ip;
//   return request(`https://ipvigilante.com/json/${ip}`);
// };



//BEFORE REFACTOR ++++++++++++++++++++++++++++++++++++
// const request = require('request-promise-native');
const { fetchMyIP } = require('./iss');

// const fetchMyIP = function() {
//   return request('https://api.ipify.org?format=json');
// };

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };