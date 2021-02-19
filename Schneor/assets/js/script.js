// curl -X GET "https://api.predicthq.com/v1/events/" \
// -H "Authorization: Bearer $ACCESS_TOKEN"

// var url = "https://api.predicthq.com/v1/events/?q=jazz/";

// fetch(url, {
//     method: 'GET', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//         'Authorization':  'Bearer rke5JTFo7dRjOITRR8bPHNg5L_gb8ili9kKKaVJM'
//     //   'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     // redirect: 'follow', // manual, *follow, error
//     // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     // body: JSON.stringify(data) // body data type must match "Content-Type" header
//   })
//   .then(function(respons){
//     return respons.json();
//   })
//   .then(function(data){
//       console.log(data)
//   });

// https://rest.bandsintown.com/v4/artists/justin%20bieber/events/?app_id=codingbootcamp
// rest.bandsintown.com/v4/artists/justin%20bieber/events/?app_id=codingbootcamp
var joeKey = config.JOE_KEY;
var myKey = config.MY_KEY;
var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var dataLong = [];
var dataLat = [];
var artistCard = document.querySelector(".artistCard");

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search; //.split('&');
  console.log(searchParamsArr);

  // Get the query and format values
  var query = searchParamsArr.split("=").pop();
  //   var format = searchParamsArr[1].split('=').pop();
  console.log(query);

  searchApi(query);
}

// let map;

// function initMap() {
//   var map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 42.56434, lng: -102.54563 },
//     zoom: 8,
//   });
//   console.log(map);
// }

// initMap();

function printResults(resultObj) {
  console.log(resultObj);

  resultTextEl.textContent = resultObj.lineup;

  // set up `<div>` to hold result content
  var resultCard = document.createElement("div");
  resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

  var resultBody = document.createElement("div");
  resultBody.classList.add("card-body");
  resultCard.append(resultBody);

  var titleEl = document.createElement("h3");
  titleEl.textContent = resultObj.venue.name + "," + resultObj.venue.location;

  var time = resultObj.datetime.slice(11, 16);
  console.log(time);
  var date = resultObj.datetime.slice(0, 10);
  console.log(date);

  var bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    "<strong>Date:</strong> " +
    date +
    "<br />" +
    "<strong>Time</strong>" +
    time +
    "<br />";

  if (resultObj.venue.location) {
    bodyContentEl.innerHTML +=
      "<strong>Location:</strong> " + resultObj.venue.location + "<br/>"; //.join(', ') +
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  if (resultObj.venue.name) {
    bodyContentEl.innerHTML +=
      "<strong>Venue name:</strong> " + resultObj.venue.name;
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Description:</strong>  No description for this entry.";
  }

  var longRet = parseFloat(dataLong);
  var latRet = parseFloat(dataLat);
  console.log(longRet);
  console.log(latRet);

  // write frunction to grab location in google api to map out lat long
  var mapsLink = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

  mapsLink = mapsLink + latRet + "," + longRet + "&key=" + myKey;
  console.log(mapsLink);
  // fetch(mapsLink)
  //   .then(function (response) {
  //     if (!response.ok) {
  //       throw response.json();
  //     }

  //     return response.json();
  //   })
  //   .then(function (mapRes) {
  //     console.log(mapRes);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  let map;
  var mapDiv = document.createElement("div");
  mapDiv.classList.add("mapDiv");

  mapDiv.setAttribute("id", "map");
  resultBody.append(mapDiv);

  // var newImg = document.createElement("img");
  // newImg.classList.add("img");
  // newImg.setAttribute(
  //   "src",
  //   "https://maps.googleapis.com/maps/api/staticmap?center=" +
  //     resultObj.venue.latitude +
  //     "," +
  //     resultObj.venue.longitude +
  //     "&zoom=18&size=550&maptype=terrain&key" +
  //     myKey
  // );
  // console.log(resultObj.artist.image_url);

  // function initMap() {
  //   var map = new google.maps.Map(document.getElementById("map" + index), {
  //     center: { lat: resultObj.venue.latitude, lng: resultObj.venue.longitude },
  //     zoom: 8,
  //   });
  //   console.log(map);
  // }

  // function myMap() {
  //   var mapProp = {
  //     center: new google.maps.LatLng(
  //       resultObj.venue.latitude,
  //       resultObj.venue.longitude
  //     ),
  //     zoom: 18,
  //   };
  //   var map = new google.maps.Map(document.getElementById("map"), mapProp);
  //   return map;
  // }

  var linkButtonEl = document.createElement("a");
  linkButtonEl.textContent = "Read More";
  linkButtonEl.setAttribute("href", resultObj.url);
  linkButtonEl.classList.add("btn", "btn-dark");
  linkButtonEl.setAttribute("target", "_blank");

  var directionsBtn = document.createElement("a");
  directionsBtn.textContent = "Directions";
  directionsBtn.setAttribute(
    "href",
    "https://www.google.com/maps/search/?api=1&query=" +
      resultObj.venue.latitude +
      "," +
      resultObj.venue.longitude,
    "_blank"
  );
  directionsBtn.classList.add("btn", "btn-dark");
  directionsBtn.setAttribute("target", "_blank");

  resultBody.append(titleEl, bodyContentEl, linkButtonEl, directionsBtn);

  resultContentEl.append(resultCard);
  console.log(resultObj.venue.longitude);

  dataLong = resultObj.venue.longitude;
  dataLat = resultObj.venue.latitude;
  console.log(dataLat);
  console.log(dataLong);

  function getDirections() {
    var longRet = dataLong;
    var latRet = dataLat;
    console.log(longRet);
    console.log(latRet);

    window.open(
      "https://www.google.com/maps/search/?api=1&query=" +
        latRet +
        "," +
        longRet,
      "_blank"
    );
  }

  //   imgUrl = resultObj.artist.image_url;
  //   localStorage.setItem("imgLink", imgUrl);
  //   console.log(imgUrl);
  //   return imgUrl;
}

function searchApi(query) {
  artistCard.innerHTML = "";

  var locQueryUrl = "https://rest.bandsintown.com/v4/artists/";

  //   if (format) {
  //     locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
  //   }

  locQueryUrl = locQueryUrl + query + "/events/?app_id=" + joeKey;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
      console.log(response);
    })

    .then(function (locRes) {
      console.log(locRes);

      // write query to page so user knows what they are viewing
      resultTextEl.textContent = query;
      var newImg = document.createElement("img");
      newImg.classList.add("img");
      newImg.setAttribute("src", locRes[0].artist.thumb_url);
      artistCard.append(newImg);
      // console.log(locRes.artist.thumb_url);
      // console.log(locRes);

      if (!locRes.length) {
        console.log("No results found!");
        resultContentEl.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        resultContentEl.textContent = "";
        for (var i = 0; i < locRes.length; i++) {
          printResults(locRes[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

getParams();

// getDirections();
