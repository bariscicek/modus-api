"use strict";

const _ = require("lodash");
const async = require("async");
const request = require("request");

class Controller {
  constructor() {
    this.api = "https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5";
    this.endPoint = "https://one.nhtsa.gov/webapi/api/SafetyRatings/modelyear/{{model_year}}/make/{{manufacturer}}/model/{{model}}?format=json"
    this.endPointWithRating = "https://one.nhtsa.gov/webapi/api/SafetyRatings/VehicleId/{{vehicle_id}}?format=json"
    this.response = {
      Count: 0,
      Results: []
    };
  }


  /**
   * fetch data from the endpoint replacing the given request object
   * @param  {object}   requestObject request object that has model, manufacturer and modelYear
   * @param  {Function} callback      (err, result) response body from the endpoint
   */
  fetchVehicles(requestObject, callback) {
    let params = Object.assign({
      model: "",
      manufacturer: "",
      modelYear: ""
    }, requestObject);

    let url = this.endPoint
      .replace("{{model_year}}", params.modelYear || "undefined")
      .replace("{{model}}", params.model || "undefined")
      .replace("{{manufacturer}}", params.manufacturer || "undefined")

    request(url, (err, response, body) => {
      if (err) {
        return callback(err);
      }

      callback(null, body);
    }); // request
  } // fetchVehicles

  /**
   * prepares response for the api with ratings from the previously generated response of vehicles.
   * @param  {object}   vehiclesResponse getReponse output for the vehicles
   * @param  {Function} callback         (err, response) respons json object including CrashRating
   */
  getCrashRatingsResponse(vehiclesResponse, callback) {
    if (vehiclesResponse.Results.length === 0) {
      return callback(null, vehiclesResponse);
    }
    async.each(vehiclesResponse.Results, (result, next) => {
      let url = this.endPointWithRating
        .replace("{{vehicle_id}}", result["VehicleId"]);

      request(url, (err, response, body) => {
        if (err) {
          return next(err);
        }

        try {
          let jsonBody = JSON.parse(body);
          if (!jsonBody.Results) {
            return next(new Error("Invalid response from API"));
          }

          result["CrashRating"] = jsonBody["Results"][0]["OverallRating"];

          next(null);
        } catch (err) {
          return next(err);
        }
      }); // request
    }, err => {
      if (err) {
        return callback(err);
      }

      return callback(null, vehiclesResponse);
    });

  } // getCrashRatingsResponse

  /**
   * prepares response for the api
   * @param  {object}   requestParams request params to pass fetchVechicles that include model, manufacturer
   * and modelYear
   * @param  {Function} callback      (err, response) response json object including Count and Results
   */
  getResponse(requestParams, callback) {
    if (!requestParams.model || !requestParams.modelYear || !requestParams.manufacturer) {
      console.log(new Error("Invalid request: " + JSON.stringify(requestParams)));
      return callback(null, this.response);
    }

    this.fetchVehicles(requestParams, (err, vehiclesBody) => {
      if (err) {
        return callback(err);
      }
      try {
        let jsonResponse = JSON.parse(vehiclesBody);
        let response = _.cloneDeep(this.response);
        response.Count = jsonResponse.Count;
        jsonResponse.Results.forEach(result => {
          let resultObject = {
            Description: result["VehicleDescription"],
            VehicleId: result["VehicleId"]
          };
          response.Results.push(resultObject);
        });

        return callback(null, response);
      } catch(err) {
        return callback(err);
      }
    });
  } // getResponse
}

module.exports = Controller;