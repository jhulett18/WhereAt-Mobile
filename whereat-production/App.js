 // src/App.tsx
import React from 'react';
import SplashScreen from './src/components/SplashScreen.jsx';
import AppProviders from './src/providers/AppProviders.jsx';
import StackNavigator from './src/navigation/StackNavigator.jsx';

const App = () => {

  return (
    <>
      <AppProviders>
        <SplashScreen >
          <StackNavigator />
        </SplashScreen>
      </AppProviders>
      </>
  );
};

export default App;
