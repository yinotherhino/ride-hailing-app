import React from 'react';

export default function RideAccepted (props){

    return <>
        <div className="background" >
        <div className='modal-content'>
            <p className='driverName'>Bayo Lance</p>
            <p className='carType'>Toyota</p>
            <p className='carNumber'>539-37-AP</p>
            <button className='ridebutton' onclick={fetchDriver}>Accept</button>
            <button className='ridebutton' onClick={toggleModal}>Cancel</button>
        </div>
        </div>
    </>
}

export function toggleModal (){
    document.body.classList.toggle("open")
}

export function fetchDriver(){
    // axios.post(url, {})
}