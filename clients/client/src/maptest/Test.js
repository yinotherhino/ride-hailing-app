import { useEffect, useState } from "react";
import {GoogleMap, useLoadScript, MarkerF, Marker} from "@react-google-maps/api";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
//   import useOnclickOutside from "react-cool-onclickoutside";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import axiosPost from "./axiosJob";
// import axiosPost from './axiosJob';

export default function Test(){
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    useEffect(() =>{
        navigator.geolocation.getCurrentPosition(position =>{
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        })
    }, [])

    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY, 
        libraries:["places"]
});

    if(!isLoaded){
        return <div>Loading Map...</div>
    }
    return ( 
    <Map usersPosition={{lat, lng}} destinationPosition = {{lat:6.245737, lng:5.5734694}} />)

}



function Map(props){
    const [selected, setSelected] = useState(null)
    function postDest () {
        axiosPost("http://localhost/3001/travel", {location:props.usersPosition, destination:props.destinationPosition})
    }
    return (
    <>
        <div className="places-container">
        <button className="order-ride" onClick={postDest()}>Order Ride!</button>
        <PlacesAutoComplete setSelected={setSelected} />
        </div>
        <GoogleMap zoom={15} center={JSON.parse(JSON.stringify(props.usersPosition))} mapContainerClassName="map" >

            <MarkerF position={JSON.parse(JSON.stringify(props.usersPosition))} icon={{
                url: "http://maps.google.com/mapfiles/kml/pal4/icon45.png",
                scale:  0.2
            }}/>

            {selected && <Marker position={selected} icon={{
                url: "http://maps.google.com/mapfiles/kml/pal2/icon13.png",
                scale: 2,
                
            }}/>}

        </GoogleMap>
    </>
    );
}

const PlacesAutoComplete = ({setSelected})=>{
    const {
        ready,
        value,
        setValue,
        suggestions:{status, data},
        clearSuggestions
    } = usePlacesAutocomplete()


    

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({address})
        const {lat, lng} = await getLatLng(results[0])
        // axiosPost('', {lat, lng})
        setSelected(JSON.parse(JSON.stringify({lat, lng})))

    };

    return <Combobox onSelect={handleSelect}>
                <ComboboxInput 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
                disabled={!ready} 
                className="combobox-input" 
                placeholder="Enter your destination" 
                />

                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({place_id, description}) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
}