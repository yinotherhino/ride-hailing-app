import React from "react";
import BottomScripts from './bottomscripts'
import MapBody from './mapbody'
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import googleApiKey from "../config/index";

class Map extends React.Component {
    render () {
      return (
        <div>
        {/* <Head /> */}
        <Wrapper apiKey={googleApiKey} >

                <MapBody />
        </Wrapper>
        <BottomScripts />
        </div>

      );
    }
};

export default Map;