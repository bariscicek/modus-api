var request = require("request");
var frisby = require("frisby");
var Joi = frisby.Joi;

var base_url = "http://localhost:3000/"


describe ("Modus API Test Suite", function () {
  var MODEL_YEAR = 2015;
  var MANUFACTURER = "Audi";
  var MODEL = "A3";
  describe("Requirement 1", function() {
    MODEL_YEAR = 2015;
    MANUFACTURER = "Audi";
    MODEL = "A3";
    it("shows json for vehicles/" + MODEL_YEAR + "/" + MANUFACTURER + "/"+ MODEL, function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Audi/A3")
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        'Count': Joi.number().required(),
        'Results': Joi.array().required()
      })
      .expect("json", {
        'Count': 4
      })
      .expect("jsonTypesStrict", "Results.*", {
        Description: Joi.string().required(),
        VehicleId: Joi.number().required()
      })
      .expect("jsonStrict", {
        'Count': 4,
        "Results":[{"Description":"2015 Audi A3 4 DR AWD","VehicleId":9403},{"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408},{"Description":"2015 Audi A3 C AWD","VehicleId":9405},{"Description":"2015 Audi A3 C FWD","VehicleId":9406}]
      })
      .done(done);
    }); // it

    MODEL_YEAR = 2015;
    MANUFACTURER = "Toyota";
    MODEL = "Yaris";
    it("shows json for vehicles/2015/Toyota/Yaris", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Toyota/Yaris")
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        Count: Joi.number().required(),
        Results: Joi.array().required()
      })
      .expect("jsonTypesStrict", "Results.*", {
        Description: Joi.string().required(),
        VehicleId: Joi.number().required()
      })
      .expect("json", {
        'Count': 2,
        'Results':[{"Description":"2015 Toyota Yaris 3 HB FWD","VehicleId":9791},{"Description":"2015 Toyota Yaris Liftback 5 HB FWD","VehicleId":9146}]
      })
      .done(done);
    }); // it

    MODEL_YEAR = 2015;
    MANUFACTURER = "Ford";
    MODEL = "Crown Victoria";
    it("shows json for vehicles/2015/Ford/Crown Victoria", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Ford/Crown Victoria")
      .expect('status', 200)
      .expect("json", {
        Count: 0,
        Results: []
      })
      .done(done);
    }); // it
  }); // Requirement 1
  describe("Requirement 2", function() {
    it("shows json for vehicles with post", function (done) {
      frisby.post("http://localhost:8888/vehicles", {
          "modelYear": 2015,
          "manufacturer": "Audi",
          "model": "A3"
      })
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        Count: Joi.number().required(),
        Results: Joi.array().required()
      })
      .expect("jsonStrict", {
        'Count': 4,
        "Results":[{"Description":"2015 Audi A3 4 DR AWD","VehicleId":9403},{"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408},{"Description":"2015 Audi A3 C AWD","VehicleId":9405},{"Description":"2015 Audi A3 C FWD","VehicleId":9406}]
      })
      .expect("jsonTypesStrict", "Results.*", {
        Description: Joi.string().required(),
        VehicleId: Joi.number().required()
      })
      .done(done);
    }); // it

    it("shows json for vehicles with post", function (done) {
      frisby.post("http://localhost:8888/vehicles", {
          "modelYear": 2015,
          "manufacturer": "Toyota",
          "model": "Yaris"
      })
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        Count: Joi.number(),
        Results: Joi.array()
      })
      .expect("jsonTypesStrict", "Results.*", {
        Description: Joi.string().required(),
        VehicleId: Joi.number().required()
      })
      .done(done);
    }); // it

    it("shows json for vehicles with post", function (done) {
      frisby.post("http://localhost:8888/vehicles", {
          "manufacturer": "Honda",
          "model": "Accord"
      })
      .expect('status', 200)
      .expect("json", {
        Count: 0,
        Results: []
      })
      .done(done);
    }); // it
  }); // requirement 2

  describe("Requirement 3", function() {
    MODEL_YEAR = 2015;
    MANUFACTURER = "Audi";
    MODEL = "A3";
    it("shows json for vehicles/" + MODEL_YEAR + "/" + MANUFACTURER + "/"+ MODEL + " with rating", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Audi/A3?withRating=true")
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        Count: Joi.number().required(),
        Results: Joi.array().required()
      })
      .expect("jsonTypesStrict", "Results.*", {
        CrashRating: Joi.string().required(),
        Description: Joi.string().required(),
        VehicleId: Joi.number().required()
      })
      .expect("jsonStrict", {
        'Count': 4,
        "Results":[{"Description":"2015 Audi A3 4 DR AWD","VehicleId":9403, "CrashRating": '5' },{"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408, "CrashRating": '5'},{"Description":"2015 Audi A3 C AWD","VehicleId":9405, "CrashRating":"Not Rated"},{"Description":"2015 Audi A3 C FWD","VehicleId":9406, "CrashRating":"Not Rated"}]
      })
      done(done);
    }); // it
    it("shows json for vehicles/" + MODEL_YEAR + "/" + MANUFACTURER + "/"+ MODEL + " without rating", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Audi/A3?withRating=false")
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        Count: Joi.number(),
        Results: Joi.array()
      })
      .expect("jsonStrict", {
        'Count': 4,
        "Results":[{"Description":"2015 Audi A3 4 DR AWD","VehicleId":9403},{"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408},{"Description":"2015 Audi A3 C AWD","VehicleId":9405},{"Description":"2015 Audi A3 C FWD","VehicleId":9406}]
      })
      .expect("jsonTypesStrict", "Results.*", {
        Description: Joi.string(),
        VehicleId: Joi.number()
      })
      .expect("jsonStrict", {
        'Count': 4,
        "Results":[{"Description":"2015 Audi A3 4 DR AWD","VehicleId":9403},{"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408},{"Description":"2015 Audi A3 C AWD","VehicleId":9405},{"Description":"2015 Audi A3 C FWD","VehicleId":9406}]
      })
      .done(done);
    }); // it
    it("shows json for vehicles/" + MODEL_YEAR + "/" + MANUFACTURER + "/"+ MODEL + " with invalid rating param", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Audi/A3?withRating=bananas")
      .expect('status', 200)
      .expect("jsonTypesStrict", {
        Count: Joi.number(),
        Results: Joi.array()
      })
      .expect("jsonTypesStrict", "Results.*", {
        Description: Joi.string(),
        VehicleId: Joi.number()
      })
      .done(done);
    }); // it
  }); // Requirement 3
});
