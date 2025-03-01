import create from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persist } from 'zustand/middleware';

// Event data structure
interface EventData {
  id: string;
  event_name: string;
  event_description: string;
  event_date: Date;
  event_category: string;
  coordinates: { latitude: number; longitude: number }; // Ensure coordinates are included
}

// Event store interface
interface EventStore {
  events: EventData[];
  setEvents: (events: EventData[]) => void;
  addMarker: (newEvent: EventData) => void; // Add marker function
}

// Create Zustand store
const useEventStore = create<EventStore>(
  persist(
    (set, get) => ({
      events: [],

      // Set all events (replace existing events)
      setEvents: (events: EventData[]) => {
        set({ events });
        AsyncStorage.setItem('event-storage', JSON.stringify(events))
          .then(() => console.log('Events saved to AsyncStorage'))
          .catch((error) => console.error('Failed to save events:', error));
      },

      // Add a new marker/event
      addMarker: (newEvent: EventData) => {
        const currentEvents = get().events;
        const updatedEvents = [...currentEvents, newEvent]; // Add new event to the array
        set({ events: updatedEvents });

        // Save to AsyncStorage
        AsyncStorage.setItem('event-storage', JSON.stringify(updatedEvents))
          .then(() => console.log('New event added and saved to AsyncStorage'))
          .catch((error) => console.error('Failed to save new event:', error));
      },
    }),
    {
      name: 'event-storage', // AsyncStorage key
      getStorage: () => AsyncStorage, // Use AsyncStorage for persistence
    }
  )
);

// Export addMarker directly
export const { addMarker } = useEventStore.getState();

export default useEventStore;
