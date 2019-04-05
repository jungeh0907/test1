//Google map API used to display google maps and collect info from them 

 // google map API information
 var googleAPI_key = "AIzaSyC7vnbVasWSJ-2i10phXjk_Q07yE6tOa-M";
 var mapsURL = "https://maps.googleapis.com/maps/api/js?key=" + googleAPI_key

 //global variables should be accessible from other files
 var title = "Hello";

//  function createMarker(place) {
//     var lat = response.data.results[i].geometry.location.lat;
//     var lng = response.data.results[i].geometry.location.lng;

//     var marker = new google.maps.Marker({
//         map: map,
//         position: place.geometry.location

//     });

 function initMap(myLatLng) {
   
  
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });
  
    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  

    // The Basic category includes the following fields:
    // address_component, adr_address, alt_id, formatted_address, 
    // geometry, icon, id, name, permanently_closed, photo, place_id, plus_code, 
    // scope, type, url, utc_offset, vicinity
    google.maps.event.addListener(marker, 'click', function () {
        mainContent = '<div class="info-window">' +
            '<h3>' + place.name + '</h3>' +
            '<div class="info-content">' +
            '<p>' + place.address_component + '</p>' + '<Img src=' + place.icon + '>' +
            '<p>' + "type: " + place.types + '<br>' +
            '<p>' + "ratings: " + place.rating + '<br>' +
            '<p>' + "reviews: " + place.review +
            '</div>' +
            '</div>';

        infowindow.setContent(mainContent);
        infowindow.open(map, this);
    });
}
 //clicking on the mapView 
 $("#mapView").click(function initMap() {
     var map;
     var infowindow;

     //default setting to be in Seattle
     pos = {
         lat: 47.6553216,
         lng: -122.3155712
     };

     map = new google.maps.Map(document.getElementById('map-container-5'), {
         center: pos,
         zoom: 15
     });




     infowindow = new google.maps.InfoWindow();
     var service = new google.maps.places.PlacesService(map);
     service.nearbySearch({
         location: pos,
         radius: 500,        //radius can be adjusted 
         type: ['football'], //type can be changed to search for venues we want 
         postalcode: 98105,  //zip code can be changed to search for venues we want

     }, callback);


     //callback function 
     function callback(results, status) {
         if (status === google.maps.places.PlacesServiceStatus.OK) {
             for (var i = 0; i < results.length; i++) {
                 initMap(results[i]);
             }
         }
     }

     //creating marker for places
    //  function createMarker(place) {
    //      var placeLoc = place.geometry.location;
    //      var marker = new google.maps.Marker({
    //          map: map,
    //          position: place.geometry.location
    //      });

    //      //The Basic category includes the following fields:
    //      //address_component, adr_address, alt_id, formatted_address, 
    //      //geometry, icon, id, name, permanently_closed, photo, place_id, plus_code, 
    //      //scope, type, url, utc_offset, vicinity
    //      google.maps.event.addListener(marker, 'click', function () {
    //          mainContent = '<div class="info-window">' +
    //              '<h3>' + place.name + '</h3>' +
    //              '<div class="info-content">' +
    //              '<p>' + place.address_component + '</p>' + '<Img src=' + place.icon + '>' +
    //              '<p>' + "type: " + place.types + '<br>' +
    //              '<p>' + "ratings: " + place.rating + '<br>' +
    //              '<p>' + "reviews: " + place.review +
    //              '</div>' +
    //              '</div>';

    //          infowindow.setContent(mainContent);
    //          infowindow.open(map, this);
    //      });
    //  }

 });





 //brent

  

//   var myLatLng = {lat: -25.363, lng: 131.044};
//   initMap(myLatLng)