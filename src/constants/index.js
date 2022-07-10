import * as Icon from '../component/icons'
import React from 'react'
import useWindowSize from '../hooks/useWindowSize';


export default {
    MOBILE_SIZE: 640,
    HD: 1920,
}

    export const MENU = [
        {
            title: 'Odkrywaj',
            path: '/',
            icon: <Icon.Home />,
            iconSelected: <Icon.HomeActive />
        },
        {
            title: 'Aktywność',
            path: '/activity',
            icon: <Icon.Library />,
            iconSelected: <Icon.LibraryActive />
        },      
        {
            title: 'Radio',
            path: '/radio',
            icon: <Icon.Profile />,
            iconSelected: <Icon.Profile />
        },
        {
            title: 'Biblioteka',
            path: '/library',
            icon: <Icon.Settings />,
            iconSelected: <Icon.Settings />
        }
    ]

    export const MENUMOBILE = [
        {
            title: 'Home',
            path: '/',
            icon: <Icon.HomeMobile />,
            iconSelected: <Icon.HomeMobile />
        },
        {
            title: 'Aktywność',
            path: '/activity',
            icon: <Icon.Library />,
            iconSelected: <Icon.LibraryActive />
        },      
    ]

    export const MENUMOBILE2 = [
        {
            title: 'Radio',
            path: '/radio',
            icon: <Icon.Profile />,
            iconSelected: <Icon.Profile />
        },
        {
            title: 'Biblioteka',
            path: '/library',
            icon: <Icon.Settings />,
            iconSelected: <Icon.Settings />
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

    export const DWN = []//[
    //     {
    //         title: 'Pobierz',
    //         path: '/download/app',
    //         icon: <Icon.DownloadApp />,
    //         iconSelected: <Icon.DownloadApp />
    //     }
    // ]

    export const DWNM = []//[
    //     {
    //         title: 'Aplikacja',
    //         path: '/download/app',
    //         icon: <Icon.DownloadApp />,
    //         iconSelected: <Icon.DownloadApp />
    //     }
    // ]

export const PLAYLISTBTN = [

]

export const LIBRARYTABS = [
    {
        title: 'Biblioteka',
        path: '/library'
    }
]
