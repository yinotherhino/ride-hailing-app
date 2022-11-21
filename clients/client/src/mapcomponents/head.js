import React from "react";
import {Helmet} from "react-helmet";

class Head extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
              <title>Directions Service</title>
              <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

              <link rel="stylesheet" type="text/css" href="css/map.css" />
              <script src="index.js"></script>
            </Helmet>
            ...
        </div>
    );
  }
};

export default Head;
