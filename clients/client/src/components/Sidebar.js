import React, {useState, useEffect} from "react";
import "../App.css";
import { SidebarData } from "./SidebarData";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Map } from "../maptest/Test";
import { useLoadScript} from "@react-google-maps/api";


function Sidebar() {
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
    <div className="Sidebar">
      <div className="SidebarItems1">
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                onClick={() => {
                  window.location.href = `${val.path}`;
                }}
              >
                <div className="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="SidebarItems2">
        <div
          className="top"
          // onClick={() => {
          //   window.location.pathname = "/dashboard";
          // }}
        >
          <CloseIcon  id="closeicon" onClick={closeMenu  } />
          <MenuIcon id="menuicon" onClick={openMenu} />
          <div className="logo">
            <img src="./images/map/benz1-removebg-preview.png" alt="logo" />
          </div>

          <div Style={{marginRight:"20px"}}><a className="logout" href='http://localhost:3001/logout'>Logout</a></div>
        </div>

      <Map usersPosition={{lat, lng}} destinationPosition = {{lat:6.245737, lng:5.5734694}} />
      </div>
    </div>
  );
}

function openMenu (e){
    e.preventDefault();
    document.getElementById("menuicon").style.display = "none";
    document.getElementById("closeicon").style.display = "block";
    document.getElementsByClassName("SidebarItems1")[0].style.display = "flex";
}

function closeMenu (e){
    e.preventDefault();
    document.getElementById("menuicon").style.display = "block";
    document.getElementById("closeicon").style.display = "none";
    document.getElementsByClassName("SidebarItems1")[0].style.display = "none";
}

export default Sidebar;