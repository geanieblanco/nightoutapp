<<<<<<< HEAD
$(document).ready(function() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var service;
    // var currentLat;
    // var currentLong;
    // var destLat;
    // var destLong;

    // GOOGLE MAPS DIRECTIONS
    google.maps.event.addDomListener(window, "load", function() {
        var places = new google.maps.places.Autocomplete(
            document.getElementById("location-input")
        );
        google.maps.event.addListener(places, "place_changed", function() {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.A;
            var longitude = place.geometry.location.F;
        });
    });

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById("panel"));

    // GOOGLE PLACES

    google.maps.event.addDomListener(window, "load", function() {
        var places = new google.maps.places.Autocomplete(
            document.getElementById("destination-input")
        );
        google.maps.event.addListener(places, "place_changed", function() {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.A;
            var longitude = place.geometry.location.F;
            destLong = place.geometry.viewport.b.b;
            destLat = place.geometry.viewport.f.f;
=======
$(document).ready(function() {//jquery document ready
  var directionsService = new google.maps.DirectionsService();// storing direction service function
  var directionsDisplay = new google.maps.DirectionsRenderer();//storing rendering function
  //var service;
  // var currentLat;
  // var currentLong;
  //var destLat;
  //var destLong;

  // GOOGLE MAPS DIRECTIONS
  google.maps.event.addDomListener(window, "load", function() {
    var places = new google.maps.places.Autocomplete(// adding autocomplete for current location
      document.getElementById("location-input")
    );
    // google.maps.event.addListener(places, "place_changed", function() {
    //   var place = places.getPlace();
    //   var address = place.formatted_address;
    //   var latitude = place.geometry.location.A;
    //   var longitude = place.geometry.location.F;
    // });
  });

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById("panel"));

  // GOOGLE PLACES

  google.maps.event.addDomListener(window, "load", function() {
    var places = new google.maps.places.Autocomplete(
      document.getElementById("destination-input")
    );
     google.maps.event.addListener(places, "place_changed", function() {
       var place = places.getPlace();
    //   var address = place.formatted_address;
    //   var latitude = place.geometry.location.A;
    //   var longitude = place.geometry.location.F;
     destLong = place.geometry.viewport.b.b;
     destLat = place.geometry.viewport.f.f;
     });
  });

  $("#search-button").click(function() {
    event.preventDefault();

    var keyword = $("input[type]:checked").val();

    var destination = $("#destination-input").val();

    var request = {
      origin: destination
    };

    var nearbyDestlocation = new google.maps.LatLng(destLat, destLong);

    var nearbyRequest = {
      location: nearbyDestlocation,
      radius: "500",
      keyword: [keyword]
    };

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(nearbyRequest, callback);
  });

  function callback(results, status) {
    $(".empty").empty();//empty previous content
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length && i < 5; i++) {
          var item = results[i];
          var rating = "None";// storing rating if it doesnt exist in json

          if (item.rating) {
            rating = item.rating;//storing rating to value if it does exist
          }

          var hours = "Unknown"; //storing hours if it doesnt exist in json
          if (item.opening_hours) {
            hours = item.opening_hours.open_now;
            if (hours === true) {
              hours = "Yes";//storing hours to yes if true
            } else {
              hours = "No";//storing hours to no if true
            }
          }
          // var addresses = [item.vicinity];
          $(".table").prepend(
            '<tr class = "empty"><td>' +
              item.name +
              "</td><td>" +
              item.vicinity +
              "</td><td>" +
              rating +
              "</td><td>" +
              hours +
              "</td><td>" +
              "<button class='directionsbutton' data-directions=' " +
              item.vicinity +
              "'>Go Here</button>" +
              "</tr>"
          );
        }
        $(".directionsbutton").on("click", function() {
          console.log($(this).attr("data-directions"));

          var selectedMode = document.getElementById("mode").value;// grabbing mode of transport from dropdown menu
          var mode = $("input[mode]:checked").val();
          $("#establishment-input").val($(this).attr("data-directions"));
          var address = $("#location-input").val();
          var destination = $("#establishment-input").val();
          var request = {
            origin: address,
            destination: destination,
            travelMode: google.maps.DirectionsTravelMode[selectedMode]
          };

          directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            }
          });
>>>>>>> 8742a7d167412d260d1b6b5f633c60ce2abcf09f
        });
    });

    $("#search-button").click(function() {
        event.preventDefault();

        var keyword = $("input[type]:checked").val();

        var destination = $("#destination-input").val();

        var request = {
            origin: destination
        };

        var nearbyDestlocation = new google.maps.LatLng(destLat, destLong);

        var nearbyRequest = {
            location: nearbyDestlocation,
            radius: "500",
            keyword: [keyword]
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(nearbyRequest, callback);
    });

    function callback(results, status) {
        $(".empty").empty();
        if (status == google.maps.places.PlacesServiceStatus.OK)
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log(results[0]);
                console.log(results);
                var i = 0;
                for (i = 0; i < results.length && i < 5; i++) {
                    var item = results[i];
                    var rating = "None";

                    if (item.rating) {
                        rating = item.rating;
                    }

                    var hours = "Unknown";
                    if (item.opening_hours) {
                        hours = item.opening_hours.open_now;
                        if (hours === true) {
                            hours = "Yes";
                        } else {
                            hours = "No";
                        }
                    }

                    var addresses = [item.vicinity];
                    console.log(item);
                    console.log(item.vicinity);
                    $(".table").prepend(
                        '<tr class = "empty"><td>' +
                        item.name +
                        "</td><td>" +
                        item.vicinity +
                        "</td><td>" +
                        rating +
                        "</td><td>" +
                        hours +
                        "</td><td>" +
                        "<button class='directionsbutton' data-directions=' " +
                        item.vicinity +
                        "'>Go Here</button>" +
                        "</tr>"
                    );
                }
                $(".directionsbutton").on("click", function() {
                    console.log($(this).attr("data-directions"));

                    var selectedMode = document.getElementById("mode").value;
                    var mode = $("input[mode]:checked").val();
                    $("#establishment-input").val($(this).attr("data-directions"));
                    var address = $("#location-input").val();
                    var destination = $("#establishment-input").val();
                    var request = {
                        origin: address,
                        destination: destination,
                        travelMode: google.maps.DirectionsTravelMode[selectedMode]
                    };

                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setDirections(response);
                        }
                    });
                });
            }
    }
});