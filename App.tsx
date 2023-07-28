import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/login/Login';
import RouteName  from './src/builtins/app.routename';
// import Home from './src/components/Home/home';
import Register from './src/screens/register/Register';
// import Forgot from './src/components/Forgot/forgotpass'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={RouteName.LOGIN} component={Login} options={{ headerShown: false }} />
       
        <Stack.Screen name={RouteName.REGISTER} component={Register} options={{ headerShown: false }}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;