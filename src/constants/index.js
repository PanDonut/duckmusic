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
            title: 'Biblioteka',
            path: '/library',
            icon: <Icon.Library />,
            iconSelected: <Icon.LibraryActive />
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

    export const MENUOFF = [
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
        }
    ]

    export const DWN = [
        {
            title: 'Pobierz aplikację',
            path: '/download/app',
            icon: <Icon.DownloadApp />,
            iconSelected: <Icon.DownloadApp />
        }
    ]

    export const DWNM = [
        {
            title: 'Aplikacja',
            path: '/download/app',
            icon: <Icon.DownloadApp />,
            iconSelected: <Icon.DownloadApp />
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
