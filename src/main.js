import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { findTrails } from './apis/trails';
import { findWeather } from './apis/weather';
//import { findCampgrounds } from './apis/camping';
//import { findDistance } from './apis/distance';


$(document).ready(function() {
  $("#searchNearby").click(function() {
    $("#hikesNearby").slideDown();
    $("#intro").hide();
  });
  $("#searchDestination").click(function() {
    $("#searchByPlace").slideDown();
    $("#intro").hide();
  });
  $("#find-trails").click(function () {
    $("#resultsDiv").slideDown("ease");
    $("#hikesNearby").hide();
    let maxHikeDistance = $("input#trail-distance").val();
    $("input#trail-distance").val("");
    let hikingDate = $('input#dateInput').val();
    $("input#dateInput").val("");
    findTrails()
      .then((response) => {
        $("#display-results").empty();
        const body = JSON.parse(response);
        const trails = body.trails;
        for (let i in trails){
          if (trails[i].length < maxHikeDistance){
            let trailCoordinates = `${trails[i].latitude},${trails[i].longitude}`;
            /* Dark Sky Weather API. Trail coordinates are used as arguments to find weather for that area. */
            findWeather(trailCoordinates, hikingDate)
              .then((response) => {
                let weatherBody = JSON.parse(response);
                let weatherSummary = weatherBody.daily.data[0].summary;
                let temperature = weatherBody.daily.data[0].temperatureHigh;
                findDistance(currentLocation)
                  .then((response) => {
                    let locationBody = JSON.parse(response);
                    let currentLocation = getLocation();
                      $("#display-results").append(`${trails[i].name}<br>${trails[i].location}<br>${trails[i].length} mile hike<br>${trails[i].latitude}, ${trails[i].longitude}<br>${weatherSummary}<br>${temperature} degree high<a href="https://www.google.com/maps/dir/${currentLocation}/${trailCoordinates}">Get Directions</a><p></p><hr>`);
              }
              // function(error) {
              //   console.error(`I am the error message: ${error.message}`);
              // });
          }
        }
      },
      function(error) {
        $("#display-results").empty().append(`<h5>There was an error processing your request: ${error.message}</h5>`);
        $("#display-div").show();
      });
    });
  });
  $("#goHome").click(function() {
    $("#resultsDiv").hide();
    $("#intro").slideDown();
  });
  
  $("#goHome2").click(function() {
    $("#searchByPlace").hide();
    $("#intro").slideDown();
  });
});











// import $ from 'jquery';
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.css';
// import { findTrails } from './apis/trails';
// import { findWeather } from './apis/weather';
// //import { findCampgrounds } from './apis/camping';
// //import { findDistance } from './apis/distance';
//
// $(document).ready(function() {
//
//   $("#searchNearby").click(function() {
//     $("#hikesNearby").slideDown();
//     $("#intro").hide();
//   });
//
//   $("#searchDestination").click(function() {
//     $("#searchByPlace").slideDown();
//     $("#intro").hide();
//   });
//
//   $("#find-trails").click(function () {
//
//     let maxHikeDistance = $("input#trail-distance").val();
//
//     findTrails()
//       .then((response) => {
//         $("#display-results").empty();
//         const body = JSON.parse(response);
//         const trails = body.trails;
//
//         for (let i in trails){
//           if (trails[i].length < maxHikeDistance) {
//
//             let trailCoordinates = `${trails[i].latitude},${trails[i].longitude}`;
//
//             findWeather(trailCoordinates)/* Dark Sky Weather API. Trail coordinates are used as arguments to find weather for that area. */
//               .then((response) => {
//
//                 let weatherBody = JSON.parse(response);
//                 let weatherSummary = weatherBody.daily.data[0].summary;
//                 let temperature = weatherBody.daily.data[0].temperatureHigh;
//
//                 $("#display-results").append(`<ul><li>${trails[i].name}</li><li>${trails[i].location}</li><li>${trails[i].length} mile hike</li><li>${trails[i].latitude}</li><li>${trails[i].longitude}</li><li>${weatherSummary}</li><li>${temperature} degree high</li></ul>`);
//                 console.log(response);
//               },
//
//               // findConditions(
//               //   .then((response) => {
//               //
//               //   },
//
//               function(error) {
//                 console.error(`I am the error message: ${error.message}`);
//               });
//           }
//
//         }
//       },
//       function(error) {
//         $("#display-results").empty().append(`<h5>There was an error processing your request: ${error.message}</h5>`);
//         $("#display-div").show();
//       });
//
//   });
//   $("#goHome").click(function() {
//     $("#resultsDiv").hide();
//     $("#intro").slideDown();
//     // $("#display-results").html('');
//   });
//
//   $("#goHome2").click(function() {
//     $("#searchByPlace").hide();
//     $("#intro").slideDown();
//   });
// });


// $("#directionsButton").click(function() {
//   $("#map-canvas").show();
//   $("#searchByPlace").hide();
//   window.onload = function WindowLoad(event) {
//     var myLatlng = new google.maps.LatLng(-34.397, 150.644);
//     var myOptions = {
//      zoom: 8,
//      center: myLatlng,
//      mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//     var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
//   };
// });

// findDistance()
//   .then((response) => {
//     $("#display-results").empty();
//
//     const body = JSON.parse(response);
//     const origin_addresses = body.origin_addresses;
//     const destination_addresses = body.destination_addresses;
//     const rows = body.rows;
//     for (let i in rows){
//       if (rows[i].length > maxHikeDistance){
//         $("#display-results").append(`${body.origin_addresses}<br>${body.destination_addresses}<br>${rows.elements[i].distance}<br>${rows.elements[i].duration}<p></p>`);
//       }
//     }
//   });
