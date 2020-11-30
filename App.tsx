import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import { UserContext, UserState } from './src/contexts/UserContext';
import AppStack from './src/navigation/AppStack';

export default function App() {
  const [value, setValue] = useState<UserState>({ token: '', userId: '' });

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </UserContext.Provider>
  );
}
