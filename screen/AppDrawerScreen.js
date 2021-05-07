import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {CustomSideBarMenu} from '../components/customSideBarMenu'
import MyBartersScreen from './myBartersScreen'
import SettingScreen from './SettingScreen'
import NotificationScreen from './notificationScreen'
const AppDrawerNavigator = createDrawerNavigator({
    MyBarters:{
     screen:MyBartersScreen
    },
    notification:{
      screen : NotificationScreen
    },
    Home:{
        screen:TabNavigator
    },
  Setting:{
      screen:SettingScreen
  }
},
{contentComponent:CustomSideBarMenu},
{initialRouteName:'Home'}
)