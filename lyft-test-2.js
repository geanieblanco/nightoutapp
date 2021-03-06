$( document ).ready(function() {

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
var service;
var currentLat;
var currentLong;
var destLat;
var destLong;




// GOOGLE MAPS DIRECTIONS
google.maps.event.addDomListener(window, 'load', function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('location-input'));
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                var address = place.formatted_address;
                var latitude = place.geometry.location.A;
                var longitude = place.geometry.location.F;
              });});

var map = new google.maps.Map(document.getElementById('map'), {
  zoom:7,
  mapTypeId: google.maps.MapTypeId.ROADMAP
});

directionsDisplay.setMap(map);
directionsDisplay.setPanel(document.getElementById('panel'));


// GOOGLE PLACES

google.maps.event.addDomListener(window, 'load', function () {
            var places = new google.maps.places.Autocomplete(document.getElementById('destination-input'));
            google.maps.event.addListener(places, 'place_changed', function () {
                var place = places.getPlace();
                var address = place.formatted_address;
                var latitude = place.geometry.location.A;
                var longitude = place.geometry.location.F;
                destLong = place.geometry.viewport.b.b
                destLat = place.geometry.viewport.f.f
              });});

$('#search-button').click(function() {
    event.preventDefault();

    var keyword = $('input[type]:checked').val();

    var destination = $('#destination-input').val();

    var request = {
        origin: destination};

    var nearbyDestlocation = new google.maps.LatLng(destLat,destLong);

      var nearbyRequest = {
        location: nearbyDestlocation,
        radius: '500',
        keyword: [keyword]
      };


  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(nearbyRequest, callback);
});

function callback(results, status) {
  $('.empty').empty();
  if (status == google.maps.places.PlacesServiceStatus.OK)  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results[0])
     console.log(results)
     var i = 0
     for (i = 0; i < 5; i ++){
      var item = results[i];
      var rating = "Not Available";
      
      if (item.rating) {
        rating = item.rating
      }

      var hours = "not available";
      if (item.opening_hours) {
        hours = item.opening_hours.open_now
        if(hours === true){
          hours = "Open now"

        }
        else{
          hours = "Closed"
        }
      }
      

      var addresses = [item.vicinity];
      console.log(item);
      console.log(item.vicinity);
      $('.table').prepend('<tr class = "empty"><td>' + item.name + '</td><td>' + item.vicinity + '</td><td>' + rating +'</td><td>' + hours +'</td><td>' + "<button class='directionsbutton' data-directions=' "+ item.vicinity +"'>get directions</button>" + '</tr>'
  
  );
    };
$(".directionsbutton").on("click",function(){
      console.log($(this).attr("data-directions"))
      $("#establishment-input").val($(this).attr("data-directions"))
    var address = $('#location-input').val(); 
    var destination = $('#establishment-input').val()
    var request = {
        origin: address,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };


    directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
    })

  };};

   
  

});

  // LYFT 
  //  var OPTIONS = {
  //   scriptSrc: 'lyftWebButton.min.js',
  //   namespace: 'NightOut',
  //   clientId: 'SdaJLP8lKGiU',
  //   clientToken: 'm4ecAnkznXazSfAWHsjKUTAVm3z8cRSUatVK/MklPRnjr8AS1YUBuqhPQ1tQKHkXGc/VR7VIgiKw1hzz42eXHWfHUrvCCgPYoxeWzHYSSLeFBuW25eT3vGw=',
  //   location: {
  //     pickup: {}, 
  //     destination: {
  //       latitude: destLat,
  //       longitude: destLong,
  //     },
  //   },
  //   parentElement: document.getElementById('lyft-web-button-parent'),
  //   queryParams: {
  //     credits: ''
  //   },
  //   theme: 'launcher-medium',
  // };
  // (function(t) {
  //   var n = this.window,
  //   e = this.document;
  //   n.lyftInstanceIndex = n.lyftInstanceIndex || 0;
  //   var a = t.parentElement,
  //   c = e.createElement("script");
  //   c.async = !0, c.onload = function() {
  //   n.lyftInstanceIndex++;
  //   var e = t.namespace ? "lyftWebButton" + t.namespace + n.lyftInstanceIndex : "lyftWebButton" + n.lyftInstanceIndex;
  //   n[e] = n.lyftWebButton, t.objectName = e, n[e].initialize(t)
  // }, c.src = t.scriptSrc, a.insertBefore(c, a.childNodes[0])
  // }).call(this, OPTIONS);

// GEOLOCATION
// var geoOptions = {
//   enableHighAccuracy: true,
//   // timeout: 2000,
//   maximumAge: 0
// };

// function success(pos) {
//   var crd = pos.coords;
//   currentLat = crd.latitude;
//   currentLong = crd.longitude;
//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
//   // $("#location-input").append(crd).val().trim();
// };

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// };

// navigator.geolocation.getCurrentPosition(success, error, geoOptions);

