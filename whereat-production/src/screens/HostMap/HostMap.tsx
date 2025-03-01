import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SharedMap from '../../components/SharedMap';
import useEventStore from '../../store/EventStore'; // Import the Zustand store
import Feather from '@expo/vector-icons/Feather'; // Import the Feather icon set

export const HostMap = ({ navigation }) => {
  // Access events (markers) from Zustand store
  const markers = useEventStore((state) => state.events);

  const handleProfileSettingsPress = () => {
    console.log('Profile settings button pressed');
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEventPage');
  };

  const handleDeleteEvent = () => {
    console.log('Delete Event button pressed');
  };

  const handleModifyEvent = () => {
    console.log('Modify Event button pressed');
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

      {/* Host Profile Settings Button */}
      <TouchableOpacity style={styles.profileButton} onPress={handleProfileSettingsPress}>
        <Feather name="settings" size={24} color="white" />
      </TouchableOpacity>

      {/* Bottom Navbar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={handleCreateEvent}>
          <Feather name="plus-circle" size={24} color="white" />
          <Text style={styles.navText}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleDeleteEvent}>
          <Feather name="trash-2" size={24} color="white" />
          <Text style={styles.navText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleModifyEvent}>
          <Feather name="edit" size={24} color="white" />
          <Text style={styles.navText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileButton: {
    position: 'absolute',
    top: 40, // Adjust to your desired position
    left: 20,
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensures it appears on top of the map
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 5,
  },
});

export default HostMap;
