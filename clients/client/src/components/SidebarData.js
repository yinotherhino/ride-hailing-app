import React from 'react'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';

import NotificationsIcon from '@mui/icons-material/Notifications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
export const SidebarData = [

        {
            title: 'Home',
            path: '/dashboard',
            icon: <MapsHomeWorkIcon/>, 
            cName: 'nav-text'
        },

        {
            title: 'Notification',
            path: 'https://decagonhq.com',
            icon: <NotificationsIcon/>, 
            cName: 'nav-text'
        },
        {
            title: 'Trips',
            path: '/dashboard',
            icon: <LocalTaxiIcon/>,
            cName: 'nav-text'
        },
        {
            title: 'Payments',
            path: 'https://www.uber.com/ng/en',
            icon: <CreditCardIcon/>,
            cName: 'nav-text'
        },
        {
            title: 'Settings',
            path: '/dashboard',
            icon: <SettingsIcon/>,
            cName: 'nav-text'
        },
        {
            title: 'Logout',
            path: '/dashboard',
            icon: <ExitToAppIcon/>,
            cName: 'nav-text'
        },

]
  