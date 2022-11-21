import React from "react";
import googleApiKey from "../config/index";

class BottomScripts extends React.Component {
  render () {
    return (
      <div>
        <script async
          src={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`}>
        </script>
      </div>
    );
  }
};

export default BottomScripts;
