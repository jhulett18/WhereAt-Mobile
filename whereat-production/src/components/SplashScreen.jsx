import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { fetchEvents } from '../api/fetchEvents';
import useEventStore from '../store/EventStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedSplash from 'react-native-animated-splash-screen';
import { PacmanIndicator } from 'react-native-indicators'

const SplashScreen = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const setEvents = useEventStore((state) => state.setEvents);
  
//   const clearAllData = async () => {
//   try {
//     await AsyncStorage.clear();
//     console.log('All AsyncStorage data cleared.');
//   } catch (error) {
//     console.error('Error clearing AsyncStorage:', error);
//   }
// };


useEffect(() => {
  const fetchEventData = async () => {
    try {
      // clearAllData()
      // Check if AsyncStorage already has data
      const storedData = await AsyncStorage.getItem('event-storage');
      
      if (storedData) {
        console.log('AsyncStorage already has data:', JSON.parse(storedData));
        // If data exists, use it to update Zustand store
        setEvents(JSON.parse(storedData));
        
        // Delay the splash screen removal by 1.7 seconds
        setTimeout(() => {
          setIsLoaded(true);
        }, 2000);
        return; // Exit early to avoid fetching again
      }
      
      // If AsyncStorage is empty, fetch the events
      console.log('Fetching events...');
      const data = await fetchEvents();

      // Update Zustand store with the fetched data
      setEvents(data);

      // Store data in AsyncStorage
      await AsyncStorage.setItem('event-storage', JSON.stringify(data));
      console.log('Events saved to AsyncStorage:', data);

      // Delay the splash screen removal by 1.7 seconds
      setTimeout(() => {
        setIsLoaded(true);
      }, 1700);
    } catch (err) {
      console.error('Error fetching events:', err);
      // Delay the splash screen removal by 1.7 seconds even if there's an error
      setTimeout(() => {
        setIsLoaded(true);
      }, 1700);
    }
  };

  fetchEventData();
}, [setEvents]);

  return (
    <AnimatedSplash
      translucent={true}
      isLoaded={isLoaded}
      backgroundColor="black"
      customComponent={
        <View style={styles.splashContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/Where-Logo')}
          />
          <PacmanIndicator color='white' size={30}/>
        </View>
      }
    >
      {isLoaded ? children : null}
    </AnimatedSplash>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    width: 300,
    height: 200, // Adjusted height to accommodate the spinner
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20, // Space between logo and spinner
  },
  spinner: {
    marginTop: 20, // Adds space above the spinner, if needed
  },
});

export default SplashScreen;
