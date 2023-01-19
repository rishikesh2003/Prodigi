import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/Login';
import Register from './screens/Register';
import Dashboard from './screens/Dashboard';
import React from 'react';
import {supabase} from './config/client';

const Stack = createNativeStackNavigator();

const App = () => {
  const [session, setSession] = React.useState();
  React.useEffect(() => {
    async function getSession() {
      try {
        const {data, error} = await supabase.auth.getSession();
        if (error) {
          throw new Error(error.message);
        }
        await setSession(data.session);
        supabase.auth.onAuthStateChange((event, session) => {
          setSession(session);
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    getSession();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {session ? (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
