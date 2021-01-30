import React, { useState } from 'react';
import 'react-native-gesture-handler';

import { UserContext, UserState } from './src/contexts/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [value, setValue] = useState<UserState>({ token: '', userId: '' });

  return (
    <UserContext.Provider value={{ value, setValue }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
