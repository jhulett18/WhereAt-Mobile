import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addMarker } from '../store/EventStore'; // Import addMarker directly
import { supabase } from '../api/supabaseClient'; // Supabase database import

// Define the form input types
interface FormData {
  event_name: string;
  event_description: string;
  event_date: Date;
}

const CreateEventPage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      event_name: '',
      event_description: '',
      event_date: new Date(),
    },
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      // Prepare event data to match the structure of the database
      const newEventData = {
        event_name: data.event_name,
        event_description: data.event_description,
        event_date: data.event_date.toISOString(), // Convert date to string
        coordinates: [{ latitude: 27.3749, longitude: -80.4194 }], // You may want to make this dynamic
        event_category: 'party', // This can be dynamic too
      };

      // Insert data into Supabase
      const { data: eventData, error } = await supabase
        .from('Events') // Ensure this is your correct table name
        .insert([newEventData]);

      if (error) {
        throw new Error(error.message); // Handle Supabase errors
      }

      if (eventData && eventData.length > 0) {
        // Event inserted successfully, handle marker addition
        const newMarker = {
          id: eventData[0].id, // Supabase will return the new event's ID
          event_name: eventData[0].event_name,
          event_description: eventData[0].event_description,
          event_date: eventData[0].event_date,
          coordinates: eventData[0].coordinates, // Should include latitude/longitude
        };

        console.log(newMarker);

        // Use addMarker function directly from the store
        addMarker(newMarker); // Update Zustand store with the new marker

        Alert.alert('Success', 'Event created successfully!');

        // Navigate back to HostMap
        navigation.navigate('HostMap');
        reset(); // Reset form after successful submission
      } else {
        Alert.alert('Error', 'Events passed to database but some parameters failed');
      }
    } catch (error: any) {
      console.error('Error inserting event:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Event</Text>

      <Text style={styles.label}>Event Name</Text>
      <Controller
        control={control}
        name="event_name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter event name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>Description</Text>
      <Controller
        control={control}
        name="event_description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter description"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>Date</Text>
      <Controller
        control={control}
        name="event_date"
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{value ? new Date(value).toDateString() : 'Pick a date'}</Text>
            {showDatePicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowDatePicker(false);
                  onChange(selectedDate || value);
                }}
              />
            )}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.submitButtonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#0066FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CreateEventPage;
