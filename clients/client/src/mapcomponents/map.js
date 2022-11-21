import React from "react";
import Head from "./head";
import BottomScripts from './bottomscripts'
import MapBody from './mapbody'

class Map extends React.Component {
    render () {
      return (
        <div>
        <Head />
        <MapBody />
        <BottomScripts />
        </div>

      );
    }
};

export default Map;