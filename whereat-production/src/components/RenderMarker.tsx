// src/components/SharedMap/MarkerComponent.tsx
import React, { useRef}  from 'react';
import { Marker } from 'react-native-maps';
import { Animated, Image, StyleSheet, Vibration, TouchableOpacity} from 'react-native';

// Marker data type
export interface MarkerData {
  id: string;
  event_name: string;
  event_description: string;
  event_date: Date;
  event_category: string;
  coordinates: { latitude: number; longitude: number }[]; // Include coordinates field
  image: any; // This will store the path to the image  
}

// MarkerComponent props type
interface MarkerComponentProps {
  marker: MarkerData;
  markerScale: Animated.Value;
  onPress: (marker: MarkerData) => void;
}


// Helper function to get the image based on event category
const getCategoryImage = (category: string) => {
  switch (category) {
    case 'art':
      return require('../../assets/drink-soda-svgrepo-com.png');
    case 'sports':
      return require('../../assets/food-color-sushi-100.png');
    case 'party':
      return require('../../assets/snack-icon.png');
    default:
      return require('../../assets/Where-Logo'); // Fallback image
  }
};


const RenderMarker: React.FC<MarkerComponentProps> = ({ marker, markerScale, onPress }) => {
  
  // Create a reference for the animated scale value
  const bounceAnim = useRef(new Animated.Value(1)).current;


  const handlePress = () => {

  // Vibration effect
  Vibration.vibrate(100); // Light vibration for 100ms

  // Bounce animation
  Animated.sequence([
    Animated.timing(bounceAnim, {
      toValue: 1.5, // Scale up
      duration: 500,
      useNativeDriver: true,
    }),
    Animated.timing(bounceAnim, {
      toValue: 1, // Scale back to normal
      duration: 1500,
      useNativeDriver: true,
    }),
  ]).start();
};
  
  return (
    <TouchableOpacity onPress={handlePress}>
      <Marker
        key={marker.id}
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={marker.coordinates[0]}
        title={marker.event_name}
      >
        <Animated.View style={[styles.markerIcon, { transform: [{ scale: markerScale }] }]}>
          {/* <Image source={marker.image} style={styles.customIcon} /> */}
        <Image source={getCategoryImage(marker.event_category)} style={styles.customIcon} />
        </Animated.View>
      </Marker>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customIcon: {
    width: 50,
    height: 50,
  },
  markerIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RenderMarker;
