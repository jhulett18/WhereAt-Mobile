// src/navigation/StackNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CreateEventPage from '../components/CreateEventPage'
import { HostMap } from '../screens/HostMap/HostMap';
import { UserMap } from '../screens/UserMap/UserMap';
import  UserSignUp  from '../auth/UserSignUp'

const Stack = createStackNavigator()

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserMap" component={UserMap} />
      <Stack.Screen name="HostMap" component={HostMap} />
      <Stack.Screen name="UserSignUp" component={UserSignUp} options={{ presentation: 'modal', headerShown: true }} />
       <Stack.Screen name="CreateEventPage" component={CreateEventPage} /> 
    </Stack.Navigator>
  );
};

export default StackNavigator;
