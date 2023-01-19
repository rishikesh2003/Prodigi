import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import QR from './Dashboard/QR';
import Profile from './Dashboard/Profile';
import Home from './Dashboard/Home';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Scan QR') {
            iconName = focused ? 'qr-code' : 'qr-code-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#61a557',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Scan QR" component={QR} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Dashboard;
