import React, { useState, useRef } from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet, Animated } from 'react-native';
import RenderMarker, { MarkerData } from './RenderMarker';

interface SharedMapProps {
  initialRegion: Region;
  markers?: MarkerData[];
  customStyles?: any;
}

const SharedMap: React.FC<SharedMapProps> = ({ initialRegion, markers = [], customStyles }) => {
  // Create the mapViewRef inside this component
  const mapViewRef = useRef<MapView | null>(null);

  // Initialize marker scales for animation
  const [markerScales] = useState(() => {
    const initialScales = new Map<string, Animated.Value>();
    markers.forEach((marker) => {
      initialScales.set(marker.id, new Animated.Value(.7));
    });
    return initialScales;
  });

  return (
    <MapView ref={mapViewRef} style={[styles.map, customStyles]} initialRegion={initialRegion}>
      {markers.map((marker) => {
        const markerScale = markerScales.get(marker.id) || new Animated.Value(1);
        return (
          <RenderMarker
            key={marker.id}
            marker={marker}
            markerScale={markerScale}
          />
        );
      })}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default SharedMap;
