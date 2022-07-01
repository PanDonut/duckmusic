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
        },
//         {
//             title: 'Przekaż',
//             path: '/settings',
//             icon: 
//             <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cash">
//   <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
//   <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
// </svg>
//             ,
//             iconSelected:
//             <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-cash">
//   <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
//   <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
// </svg>
//         }
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
