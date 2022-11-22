import initMap from './initMap';

let latitude;
let longitude;

const options = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
};

async function success(pos) {
	const crd = pos.coords;
  longitude= 	crd.longitude
  latitude= crd.latitude
  console.log(latitude, longitude)
//   let location= {latitude, longitude}

  await initMap(latitude, longitude)
}

function error(err) {
	document.getElementById('locationError').innerHTML = 'Error fetching location';
}
const getGeolocation = ()=>{
	navigator.geolocation.watchPosition(success, error, options)
}

export default getGeolocation;