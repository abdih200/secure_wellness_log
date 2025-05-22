import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthScreen = () => {
  const [mood, setMood] = useState('');
  const [notes, setNotes] = useState('');
  const [lastEntry, setLastEntry] = useState(null);

  useEffect(() => {
    loadLastEntry();
  }, []);

  const handleSave = async () => {
    const healthLog = {
      mood,
      notes,
      date: new Date().toLocaleDateString(),
    };

    try {
      await AsyncStorage.setItem('healthLog', JSON.stringify(healthLog));
      Alert.alert('Saved!', 'Your daily health log has been saved.');
      setMood('');
      setNotes('');
      setLastEntry(healthLog);
    } catch (error) {
      Alert.alert('Error', 'Failed to save your health log.');
      console.error('Storage error:', error);
    }
  };

  const loadLastEntry = async () => {
    try {
      const storedLog = await AsyncStorage.getItem('healthLog');
      if (storedLog) {
        setLastEntry(JSON.parse(storedLog));
      }
    } catch (error) {
      console.error('Failed to load entry:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Daily Wellness Log</Text>

      <TextInput
        style={styles.input}
        placeholder="How are you feeling today?"
        value={mood}
        onChangeText={setMood}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Any notes or details?"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
      <Button title="Save Entry" onPress={handleSave} />

      {lastEntry && (
        <View style={styles.entryContainer}>
          <Text style={styles.entryTitle}>Last Saved Entry</Text>
          <Text><Text style={styles.label}>Date:</Text> {lastEntry.date}</Text>
          <Text><Text style={styles.label}>Mood:</Text> {lastEntry.mood}</Text>
          <Text><Text style={styles.label}>Notes:</Text> {lastEntry.notes}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  entryContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default HealthScreen;
