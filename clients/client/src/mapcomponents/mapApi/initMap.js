function initMap(lat= 41.85, lng= -87.65) {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const map = new google.maps.Map(
      document.getElementById("map") ,
      {
        zoom: 8,
        center: { lat, lng },
      }
    );

    const size = new google.maps.Size(42,68)

    const marker = new google.maps.Marker({
      position: {lat, lng},
      map: map,
      label: "user",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
        labelOrigin: new google.maps.Point(60, 30)
      }
    });

    const driverMarker = new google.maps.Marker({
      position: {lat:lat+ 0.02, lng:lng+0.02},
      map: map,
      label: "driver",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        labelOrigin: new google.maps.Point(100, 50)
      }
    });

    const destinationMarker = new google.maps.Marker({
      position: {lat:lat+ 0.01, lng:lng+0.03},
      map: map,
      label: "destination",
      icon: {
        url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        labelOrigin: new google.maps.Point(100, 50)
      }

    });
    const start = new google.maps.LatLng(lat, lng);
    const end = new google.maps.LatLng(lat+0.01, lng+0.01);

    var request = {
      origin: start,
      destination: end,
      // Note that JavaScript allows us to access the constant
      // using square brackets and a string value as its
      // "property."
      travelMode: google.maps.TravelMode['DRIVING']
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      //travel time
      console.log(response.routes[0].legs[0].duration.value)
      directionsRenderer.setDirections(response);
    }
  });

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(marker.getPosition());
    bounds.extend(driverMarker.getPosition());
    bounds.extend(destinationMarker.getPosition());
    map.fitBounds(bounds);
    directionsRenderer.setMap(map);
    
    const onChangeHandler = function () {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    };
    
    (document.getElementById("start") ).addEventListener(
      "change",
      onChangeHandler
    );
    (document.getElementById("end") ).addEventListener(
      "change",
      onChangeHandler
    );
}

export default initMap;