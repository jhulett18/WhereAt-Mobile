import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Animated, Easing, Text } from 'react-native';
import SharedMap from '../../components/SharedMap';
import useEventStore from '../../store/EventStore'; // Import the Zustand store
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const UserMap = ({ navigation }) => {
  // Access events (markers) from Zustand store
  const markers = useEventStore((state) => state.events);
  const [isPanelVisible, setPanelVisible] = useState(false); // State to control panel visibility
  const slideAnim = useRef(new Animated.Value(-250)).current; // Animation state for the panel

  console.log('Current Marker in UserMap: ', markers);

  // Function to toggle panel visibility
  const togglePanel = () => {
    setPanelVisible(!isPanelVisible);
    Animated.timing(slideAnim, {
      toValue: isPanelVisible ? -250 : 0, // Slide in or out
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  // Navigation function
  const navigateToSignUp = () => {
    togglePanel();
    navigation.navigate('UserSignUp');
  };

  const initialRegion = {
    latitude: 27.38178,
    longitude: -80.343148,
    latitudeDelta: 1,
    longitudeDelta: 1,
  };

  return (
    <View style={styles.container}>
      <SharedMap initialRegion={initialRegion} markers={markers} />

      <TouchableOpacity style={styles.circularButton} onPress={togglePanel}>
        <Text style={styles.buttonText}>☰</Text>
      </TouchableOpacity>

      <Animated.View style={[styles.sidePanel, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.panelText}>Custom Menu</Text>
        <TouchableOpacity onPress={togglePanel} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>

        {/* Navigation Items */}
        <ScrollView contentContainerStyle={styles.menuItemsContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToSignUp}>
            <MaterialCommunityIcons name="crown" size={24} color="white" />
            <Text style={styles.menuItemText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Entypo name="megaphone" size={24} color="white" />
            <Text style={styles.menuItemText}>Current News</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circularButton: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
  sidePanel: {
    position: 'absolute',
    width: 250,
    height: '100%',
    backgroundColor: '#161618',
    top: 0,
    left: 0,
    padding: 20,
    zIndex: 1,
    elevation: 5,
  },
  panelText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  menuItemsContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
  },
});

export default UserMap;
