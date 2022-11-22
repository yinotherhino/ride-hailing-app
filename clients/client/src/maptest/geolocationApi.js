
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
//   console.log(latitude, longitude)
  return {lat:latitude, lng:longitude}
}

function error(err) {
	document.getElementById('locationError').innerHTML = 'Error fetching location';
	return null
}
const getTestGeolocation = async()=>{
	navigator.geolocation.watchPosition(success, error, options)
}

export default getTestGeolocation;