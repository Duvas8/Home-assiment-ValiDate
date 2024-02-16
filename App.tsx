

import React from 'react';

import { AuthProvider } from './clinet/context/authProvider'; // Import the AuthProvider component

import AppNavigator from './clinet/components/AppNavigator'; // Your app's main navigator component

const App = () => {
  return (
    <AuthProvider>
        <AppNavigator />
    </AuthProvider>
  );
};

export default App;

