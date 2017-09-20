# modus-api Vechicle API

## Introduction

Modus-Api is an API server for [NHTSA NCAP 5 Star Safety Ratings API](https://one.nhtsa.gov/webapi/Default.aspx?SafetyRatings/API/5).

## Usage

$ npm install --production

$ npm start

## Test

You need to have [Jasmine](https://jasmine.github.io/) for tests.

$ npm install

$ npm test

## API

### List vehicles

Get the details of the vehicles for a given model, model year and manufacturer.

**URL** : `/vehicles/<MODEL YEAR>/<MANUFACTURER>/<MODEL>[?withRating=true]`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

**Sample requests**

`http://localhost:8888/vehicles/2015/Audi/A3`

`http://localhost:8888/vehicles/2015/Audi/A3?withRating=true`

#### Success Response

**Code** : `200 OK`

**Content examples**

For a given model year, manufacturer and model, existing results from the NHTSA API

```json
  "Count": 4,

  "Results":[
    {"Description": "2015 Audi A3 4 DR AWD","VehicleId":9403},

    {"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408},

    {"Description":"2015 Audi A3 C AWD","VehicleId":9405},

    {"Description":"2015 Audi A3 C FWD","VehicleId":9406}
  ]
```

Results with `withRating=true` query.


```json
  "Count": 4,

  "Results":[
    {"Description":"2015 Audi A3 4 DR AWD","VehicleId":9403, "CrashRating": "5" },

    {"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408, "CrashRating": "5"},

    {"Description":"2015 Audi A3 C AWD","VehicleId":9405, "CrashRating":"Not Rated"},

    {"Description":"2015 Audi A3 C FWD","VehicleId":9406, "CrashRating":"Not Rated"}
  ]
```
### Notes

* In case there is an invalid request following response it send. Error messages are reported
to console of server.

```json
{
  Count: 0,

  Results: []
}
```
* For withRating query, only "true" is valid for enabing ratings of the results.

## List vehicles based on POST request

Get the details of the vehicles for a given model, model year and manufacturer.

**URL** : `/vehicles`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

```json
{
    "model": "text, required",
    "modelYear": "text, required",
    "manufacturer": "text, required"
}
```

**Data examples**

Partial data is allowed but not return any result.

```json
{
    "model": "A3",
    "manufacturer": "Audi",
    "modelYear": "2015"
}
```

#### Success Response

**Code** : `200 OK`

**Content examples**

For a given model year, manufacturer and model, existing results from the NHTSA API

```json
  "Count": 4,

  "Results":[
    {"Description": "2015 Audi A3 4 DR AWD","VehicleId":9403},

    {"Description":"2015 Audi A3 4 DR FWD","VehicleId":9408},

    {"Description":"2015 Audi A3 C AWD","VehicleId":9405},

    {"Description":"2015 Audi A3 C FWD","VehicleId":9406}
  ]
```
### Notes

* In case there is an invalid request following response it send. Error messages are reported
to console of server.

```json
{
  Count: 0,

  Results: []
}
```