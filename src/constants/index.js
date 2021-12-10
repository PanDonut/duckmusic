import * as Icon from '../component/icons'
import React from 'react'
import useWindowSize from '../hooks/useWindowSize';


export default {
    MOBILE_SIZE: 640,
    HD: 1920,
}

    export const MENU = [
        {
            title: 'Główna',
            path: '/',
            icon: <Icon.Home />,
            iconSelected: <Icon.HomeActive />
        },
        {
            title: 'Szukaj',
            path: '/search',
            icon: <Icon.Search />,
            iconSelected: <Icon.SearchActive />
        },
        {
            title: 'Profil',
            path: '/profile',
            icon: <Icon.Profile />,
            iconSelected: <Icon.Profile />
        }
    ]

export const PLAYLISTBTN = [

]

export const LIBRARYTABS = [
    {
        title: 'Biblioteka',
        path: '/library'
    }
]
