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





//https://rest.bandsintown.com/v4/artists/justin%20bieber/events/?app_id=codingbootcamp

var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var longitudeEl 
var latitudeEl
console.log(longitudeEl)
console.log(latitudeEl)
var joeKey = config.JOE_KEY

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search //.split('&');
  console.log(searchParamsArr)

  // Get the query and format values
  var query = searchParamsArr.split('=').pop();
//   var format = searchParamsArr[1].split('=').pop();
console.log(query)

  searchApi(query);
}



function printResults(resultObj) {
  console.log(resultObj);

  // longitudeEl = resultObj.venue.longitude;
  // latitudeEl = resultObj.venue.latitude;
  // console.log(longitudeEl)
  // console.log(latitudeEl)
 
  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var titleEl = document.createElement('h3');
  titleEl.textContent = resultObj.lineup;

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.datetime + '<br/>';

  if (resultObj.venue.location) {
    bodyContentEl.innerHTML +=
      '<strong>Location:</strong> ' + resultObj.venue.location + '<br/>'; //.join(', ') + 
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Subjects:</strong> No subject for this entry.';
  }

  if (resultObj.venue.name) {
    bodyContentEl.innerHTML +=
      '<strong>Venue name:</strong> ' + resultObj.venue.name;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }

  if (result.results.address_components.formatted_address) {
    bodyContentEl.innerHTML +=
      '<strong>Address:</strong> ' + result.results.address_components.formatted_address;
  } else {
    bodyContentEl.innerHTML +=
      '<strong>Description:</strong>  No description for this entry.';
  }
  console.log(result.results.address_components.formatted_address)
  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(titleEl, bodyContentEl, linkButtonEl);

  resultContentEl.append(resultCard);

  //   var longitudeEl = longitudeTemp;
  //   var latitudeEl = latitudeTemp;
  //   console.log(longitudeEl);
  //   console.log(latitudeEl);
}



function searchApi(query) {
  var locQueryUrl = 'https://rest.bandsintown.com/v4/artists/';

//   if (format) {
//     locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
//   }

  locQueryUrl = locQueryUrl + query + '/events/?app_id=' + joeKey;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      console.log(locRes);
        
      // write query to page so user knows what they are viewing
      resultTextEl.textContent = query;

      console.log(locRes);

      if (!locRes.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.length; i++) {
          printResults(locRes[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
    searchAddress()
}

function searchAddress() {

  var addQueryUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=36.103008,-115.178196';

//   if (format) {
//     locQueryUrl = 'https://www.loc.gov/' + format + '/?fo=json';
//   }

  addQueryUrl = addQueryUrl + '&key=AIzaSyCD-1NVl_YZVHBlWGXQUP5k899ykfBq4Do';
  console.log(addQueryUrl)
  console.log(latitudeEl)
  console.log(longitudeEl)

  fetch(addQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
  })
  .then(function (locRes) {
      console.log(locRes);
        
      // write query to page so user knows what they are viewing
      // resultTextEl.textContent = query;

      // console.log(locRes);

      // if (!result.length) {
      //   console.log('No results found!');
      //   // resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      // } else {
      //   // resultContentEl.textContent = '';
      //   for (var i = 0; i < result.length; i++) {
          printResults(locRes);
        
      
  })
  .catch(function (error) {
      console.error(error);
  });

}

function handleSearchFormSubmit(event) {
  event.preventDefault();




// function handleSearchFormSubmit(event) {
//   event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;
//   var formatInputVal = document.querySelector('#format-input').value;

//   if (!searchInputVal) {
//     console.error('You need a search input value!');
//     return;
//   }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();
