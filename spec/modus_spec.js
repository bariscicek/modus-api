var request = require("request");
var frisby = require("frisby");

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
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        VehicleDescription: String,
        VehicleId: Number
      })
      .done(done);
    }); // it

    MODEL_YEAR = 2015;
    MANUFACTURER = "Toyota";
    MODEL = "Yaris";
    it("shows json for vehicles/2015/Toyota/Yaris", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Toyota/Yaris")
      .expect('status', 200)
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        VehicleDescription: String,
        VehicleId: Number
      })
      .done(done);
    }); // it

    MODEL_YEAR = 2015;
    MANUFACTURER = "Ford";
    MODEL = "Crown Victoria";
    it("shows json for vehicles/2015/Ford/Crown Victoria", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Ford/Crown Victoria")
      .expect('status', 200)
      .expect("json", "?", {
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
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        VehicleDescription: String,
        VehicleId: Number
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
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        VehicleDescription: String,
        VehicleId: Number
      })
      .done(done);
    }); // it

    it("shows json for vehicles with post", function (done) {
      frisby.post("http://localhost:8888/vehicles", {
          "manufacturer": "Honda",
          "model": "Accord"
      })
      .expect('status', 200)
      .expect("json", "?", {
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
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        CrashRating: String,
        VehicleDescription: String,
        VehicleId: Number
      })
      .done(done);
    }); // it
    it("shows json for vehicles/" + MODEL_YEAR + "/" + MANUFACTURER + "/"+ MODEL + " without rating", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Audi/A3?withRating=false")
      .expect('status', 200)
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        VehicleDescription: String,
        VehicleId: Number
      })
      .done(done);
    }); // it
    it("shows json for vehicles/" + MODEL_YEAR + "/" + MANUFACTURER + "/"+ MODEL + " with invalid rating param", function (done) {
      frisby.get("http://localhost:8888/vehicles/2015/Audi/A3?withRating=bananas")
      .expect('status', 200)
      .expect("jsonTypes", "?", {
        Count: Number,
        Results: Array
      })
      .expect("jsonTypes", "results.*", {
        VehicleDescription: String,
        VehicleId: Number
      })
      .done(done);
    }); // it
  }); // Requirement 3
});
