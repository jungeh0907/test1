$('#suggestions-map').hide();

 // google map API information
 var googleAPI_key = "AIzaSyC7vnbVasWSJ-2i10phXjk_Q07yE6tOa-M";
 var mapsURL = "https://maps.googleapis.com/maps/api/js?key=" + googleAPI_key;


let locations = [];


$("#search").click(function () {
    event.preventDefault();
    $("#suggestion-list").empty();
    $("#suggestion-map").empty();
    $("#invalidLocation").empty();
    locations = [];



     //a valid, fully-formed foursquare API request that includes these parameters 
     //looks like this:
     let subject = $('#activityTypeInput').val().toLowerCase();
     let locationInput = $('#locationInput').val().trim();
     console.log(locationInput)
     if ($('#locationInput').val().trim() + 'none' === 'none') {
         console.log('no')
     $('#invalidLocation').text('Please input a valid location.')
       }


     console.log(locationInput);
     let limit = $('#numOfOptionsInput').val();
     let timeInput = $('#gotimeInput').val();
     let dayInput = $('#dayInput').val();
        let d = new Date();
        let n = d.getDay();
        let day = "";
        if (dayInput == n) {
            day = "";
        }
        else {
            day = "any";
        }
        console.log(day);
    

        let priceInput = "&price=" + $('#priceInput').val();
        if (priceInput === '&price=No Price Preference') {
          priceInput = '';
        }


     var clientID = "UWNQG4U3L43EJK21FJS5FWEYSXD3GCFZIJCFHBWWNN3QVCLY";
     var client_secret = "VQWGC1GO2UFFVXVYI2MYWUFLNW2AM3CQADXRCJ21NGSNUJRV";

    var queryURL = 'https://api.foursquare.com/v2/venues/explore' + "?client_id=" + clientID +
         "&client_secret=" + client_secret + "&near=" + locationInput + "&section=" + subject + "&time=any" +
         "&day=" + day + priceInput + "&v=20181129";
     console.log(queryURL);

     $.ajax({
         url: queryURL,
         method: "GET"
     }).then(function (response) {
         var results = response.response.groups[0].items
         console.log(results);

         $('#suggestions-map').hide();

    
      for (let i = 0; i < limit; i++) {
        let listItem = $('<div class="suggestion">');

        let name = results[i].venue.name;
        let type = $('<span>').text(name);


            let itemAddress = $("<div class='address'>");
            //itemAddress.text(JSON.stringify(results[i].venue.location.formattedAddress));
            let address = results[i].venue.location.formattedAddress;
            vAddress = address[0] + " " + address[1];
            itemAddress.text(vAddress);

            let description = results[i].venue.categories[0].name;
        
            let itemDescription = $("<div class='description'>");
            itemDescription.text("Activity Description: " + description);

            let lat = results[i].venue.location.lat;
            let lng = results[i].venue.location.lng;

            let placeLocation = [
                name,
                lat,
                lng,
                vAddress,
                description
            ];

            locations.push(placeLocation);
            

            listItem.append(type, itemAddress, itemDescription);
            $('#suggestions-list').append(listItem)
            $('.suggestion').addClass('list-group-item list-group-item-action list-group-item') 

                
            //this puts option to choose from in the database
            database.ref(dataCounter + '/').set({
                name: name,
                llat: lat,
                llng: lng,
                address: vAddress,
                description: description,
                });

            
            //this create a different name for each item in th data-base
                dataCounter ++

                database.ref('num/').set({
                    dataCount: dataCounter
                    });

        };

    });
});


//Google Maps
$("#mapView").click(function () { 

var map = new google.maps.Map(document.getElementById('map-container-5'), {
    zoom: 12,
    center: new google.maps.LatLng(47.6553216,-122.3155712),

    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  var infowindow = new google.maps.InfoWindow();

  var marker, i;

  for (i = 0; i < locations.length; i++) { 
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });

    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {

        infowindow.setContent(locations[i][0] + '<br>' + 'Address: ' + locations[i][3] + '<br>' + 'Type: ' + locations[i][4]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
});


 
 $("#clear").click(function () {
    $('#suggestions-list').empty();
     $('#suggestions-map').empty();
     locations = [];
  }); 

$('#mapView').click (function () {
    $('#suggestions-list').hide();
    $('#suggestions-map').show();
  }); 

  $('#listView').click (function () {
    $('#suggestions-list').show();
    $('#suggestions-map').hide();
  }); 
