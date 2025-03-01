// fetchEvents.js
import { supabase } from './supabaseClient';
import { Alert } from 'react-native';

export const fetchEvents = async () => {
  try {
    const { data, error } = await supabase.from('Events').select('*');

    // Checks for errors
    if (error) {
      console.error('Error fetching events:', error); // Console log for debugging
      throw error; // Throw the error to trigger useQuery's onError
    }

    if (!data || data.length === 0) {
      console.log('No events found in the database'); // Console log for debugging
      return [];
    }

    // Grab data
    console.log('Fetched Events:', data);
    return data;

  } catch (error) {
    console.error('Unexpected Error:', error); // Console log for debugging
    throw error; // Throw unexpected errors to trigger useQuery's onError
  }
};
