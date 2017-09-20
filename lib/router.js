"use strict";

const express = require("express");
const Controller = require("./controller");

let router = express.Router();
let controller = new Controller();


router.route("/:modelYear/:manufacturer/:model").get(getVehicles);
router.route("/").post(getVehiclesFromBody);

/**
 * express router get handler for vehicles api
 * @param  {req}   req  express request object
 * @param  {res}   res  express response object
 * @param  {Function} next express next handler
 */
function getVehicles(req, res, next) {
  let requestParams = {
    model: req.params.model,
    manufacturer: req.params.manufacturer,
    modelYear: req.params.modelYear
  };

  controller.getResponse(requestParams, (err, vehiclesBody) => {
    if (err) {
      console.warn(err);
      return res.status(200).send(controller.response)
    }

    if (req.query.withRating == "true") {
      controller.getCrashRatingsResponse(vehiclesBody, (err, vehiclesBodyWithRating) => {
        if (err) {
          console.warn(err);
          return res.status(200).send(controller.response);
        }
        return res.status(200).send(vehiclesBodyWithRating);
      });
    } else {
      return res.status(200).send(vehiclesBody);
    }
  });
} // getVehicles

/**
 * express router post handler for vehicles api
 * @param  {req}   req  express request object
 * @param  {res}   res  express response object
 * @param  {Function} next express next handler
 */
function getVehiclesFromBody(req, res, next) {
  let requestParams = {
    model: req.body.model,
    manufacturer: req.body.manufacturer,
    modelYear: req.body.modelYear
  };

  controller.getResponse(requestParams, (err, vehiclesBody) => {
    if (err) {
      console.warn(err);
      return res.status(200).send(controller.response);
    }

    return res.status(200).send(vehiclesBody);
  });
} // getVehiclesFromBody

module.exports = router;