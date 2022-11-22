const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',

  // Optional depending on the providers
//   fetch: "LAqRAO6tKpFG7GR8",
  apiKey: 'jKV0ndmorQsDYCGg6AT4fiMuyggGpEmJ', // for Mapquest, OpenCage, Google Premier
  formatter: null // 'gpx', 'string', ...
};

export const geocoder = NodeGeocoder(options);

// Using callback
