import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';
import Screen3 from './components/Screen3';
import store from './redux/store';
import { Provider } from 'react-redux';

const Stack = createStackNavigator();
export const NameContext = createContext();

export default function App() {
  const [name, setName] = useState('');

  return (
    <Provider store={store}>
      <NameContext.Provider value={{ name, setName }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="screen1">
            <Stack.Screen name='screen1' component={Screen1} options={{ headerShown: false }} />
            <Stack.Screen name='screen2' component={Screen2} options={{ headerShown: false }} />
            <Stack.Screen name='screen3' component={Screen3} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NameContext.Provider>
    </Provider>
  );
}
