import { useMemo } from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api"
import googleApiKey from "../config/index";
import getTestGeolocation from "./geolocationApi";

export default function Test(){
    const {isLoaded} = useLoadScript({googleMapsApiKey: "AIzaSyCaWw-sX8UZeeVWOYgvmHCzV-PIb7FGbgk"});

    if(!isLoaded){
        return <div>Loading...</div>
    }
    return <Map usersPosition={getUserLocation()} destinationPosition = {{lat:6.235737, lng:5.5734694}} />
}

const getUserLocation =  async () => {
    return await getTestGeolocation()
};

function Map(props){ 
    // const usersPosition = {lat:44.1, lng:-80.02}
    return <GoogleMap zoom={15} center={{lat:6.235737, lng:5.5734694}} mapContainerClassName="map" >

    <MarkerF position={props.destinationPosition} icon={{
        url: "http://maps.google.com/mapfiles/kml/pal2/icon13.png",
        scale: 2
    }}/>

    <MarkerF position={props.usersPosition} icon={{
        url: "http://maps.google.com/mapfiles/kml/pal4/icon45.png",
        scale:  0.2
    }}/>
    {/* <p>{String()}</p> */}
</GoogleMap>
        
}