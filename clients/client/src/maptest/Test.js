import { useEffect, useMemo, useState } from "react";
import {GoogleMap, useLoadScript, MarkerF} from "@react-google-maps/api";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
	ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axios from 'axios';

export default function Test(){
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

        navigator.geolocation.watchPosition(position =>{
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        })

    const {isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY, libraries:["places"]});

    if(!isLoaded){
        return <div>Loading...</div>
    }
    return ( 
    <Map usersPosition={{lat, lng}} destinationPosition = {{lat:6.245737, lng:5.5734694}} />)
}

function Map(props){
    const [selected, setSelected] = useState(null)
    return <>
        <div className="places-container">
        <PlacesAutoComplete setSelected={setSelected} />
        </div>
        <GoogleMap zoom={15} center={props.usersPosition} mapContainerClassName="map" >

            <MarkerF position={props.destinationPosition} icon={{
                url: "http://maps.google.com/mapfiles/kml/pal2/icon13.png",
                scale: 2,
                
            }}/>

            <MarkerF position={props.usersPosition} icon={{
                url: "http://maps.google.com/mapfiles/kml/pal4/icon45.png",
                scale:  0.2
            }}/>

            {setSelected && <MarkerF position={selected}/>}

        </GoogleMap>
    </>
}

const PlacesAutoComplete = ()=>{
    return <>

    </>
}