import * as Icon from '../component/icons'
import React from 'react'

export default {
  MOBILE_SIZE: 640,
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
    }
]

export const PLAYLISTBTN = [
    {
        title: 'Duck Mix',
        path: '/playlist/duckmix1'
    },
    {
        title: 'Blinding Squad',
        path: '/playlist/squad_remix_theduck'
    },
    {
        title: 'Dmuch Guy',
        path: '/playlist/dmuch_guy'
    },
]

export const LIBRARYTABS = [
    {
        title: 'Biblioteka',
        path: '/library'
    },
    {
        title: 'Podcast\'ler',
        path: '/library/podcasts'
    },
    {
        title: 'Sanatçılar',
        path: '/library/artists'
    },
    {
        title: 'Albümler',
        path: '/library/albums'
    }
]