const axios = require("axios");

const BASE_URL = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com";
const ENTRY_ENDPOINT = "/api/products/1";

const airCons = [];

function getData(url, bucket) {
  return axios
    .get(url)
    .then(res => {
      for (let obj of res.data.objects) {
        if (obj.category === "Air Conditioners") {
          bucket.push(obj);
        }
      }
      if (res.data.next) {
        getData(BASE_URL + res.data.next, bucket);
      } else {
        getCubicMeters(airCons);
      }
    })
    .catch(err => {
      console.log("Incorrect URL or error retrieving data");
    });
}

function getCubicMeters(array) {
  let finalWeights = [];
  for (let obj of array) {
    finalWeights.push(
      (obj.size.width / 100) *
        (obj.size.length / 100) *
        (obj.size.height / 100) *
        250
    );
  }
  let sum = 0;
  finalWeights.forEach(el => {
    sum += el;
  });
  console.log(
    "Average weight of all air-conditioner products:",
    (sum / finalWeights.length).toFixed(2) + "kgs"
  );
}

getData(BASE_URL + ENTRY_ENDPOINT, airCons);
