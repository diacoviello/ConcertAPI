// Call geocode
geocode();

function geocode() {
  var location = "+ latitudeEl + ' + longitudeEl +";
  axios
    .get("https://maps.googleapis.com/maps/api/geocode/json?latlng=", {
      params: {
        key: "AIzaSyCD-1NVl_YZVHBlWGXQUP5k899ykfBq4Do",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyCD-1NVl_YZVHBlWGXQUP5k899ykfBq4Do
// https://maps.googleapis.com/maps/api/geocode/json?latlng=32.755274,-117.212196&key=AIzaSyCD-1NVl_YZVHBlWGXQUP5k899ykfBq4Do

// {
//     original url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=""
//     pull latitude= ",""
//     pull longitude=
//     &key="AIzaSyCD-1NVl_YZVHBlWGXQUP5k899ykfBq4Do"
// }
