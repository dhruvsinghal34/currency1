import * as React from 'react'
import {Image} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import  BookDonateScreen from '../screen/BookDonateScreen'
import BookRequestScreen from '../screen/BookRequestScreen'

export const AppTabNavigator = createBottomTabNavigator({
    DonateBooks : {
        screen:BookDonateScreen,
        NavigationOptions : {
           
            tabBarLabel:"book donate"
        }
    },
    RequestBooks : {
        screen:BookRequestScreen,
        NavigationOptions : {
           
            tabBarLabel:"book Request"
        }
    },
    
})