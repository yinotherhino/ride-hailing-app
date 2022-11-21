import initMap from './initMap';

let latitude;
let longitude;

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

function success(pos) {
	const crd = pos.coords;
  longitude= 	crd.longitude
  latitude= crd.latitude
//   let location= {latitude, longitude}

  initMap(latitude, longitude)
}

function error(err) {
	document.getElementById('locationError').innerHTML = 'Error fetching location';
}

navigator.geolocation.watchPosition(success, error, options)