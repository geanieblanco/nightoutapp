//

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>


<script>
var apiKey = "AIzaSyD0731Dp4I-8sNeElL_JGawbgPP3-xFkyI"

var mapQuery = "https://maps.googleapis.com/maps/api/js?key="+ apiKey +"&callback=initMap";

$.ajax ({
	url: mapQuery,
	method: 'GET'
}).done(function(response){
	var directions = response.data;
	console.log(response.data);
	$("#directions-container").prepend(directions);
})

var origin = 'Hoboken, NJ';
var destination = $("#restaurant-address");
var travelMode = $("#travel-mode");
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  var mapOptions = {
    zoom:7,
    center: Hoboken
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsDisplay.setMap(map);
}

function calcRoute() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
}

</script>

</body>
</html>