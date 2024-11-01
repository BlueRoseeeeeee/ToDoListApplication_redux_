import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NameContext } from '../App';

const API_URL = 'https://6700d49d4da5bd237554e76b.mockapi.io/todoList';

export default function Screen3({ navigation, route }) {
  const { name } = useContext(NameContext);
  const [newTask, setNewTask] = useState('');
  const isEditMode = route.params?.task !== undefined;

  const handleTaskSubmit = async () => {
    const method = isEditMode ? 'PUT' : 'POST';
    const url = isEditMode ? `${API_URL}/${route.params.task.id}` : API_URL;

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        title: newTask,
      }),
    });

    await response.json();
    route.params.fetchItems();
    navigation.goBack();
  };

  useEffect(() => {
    if (isEditMode) {
      setNewTask(route.params.task.title);
    }
  }, [isEditMode, route.params.task]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/IconButton12.png')} style={{ marginTop: 10 }} />
        </TouchableOpacity>
        <Text style={styles.greeting}>Hi {name}</Text>
      </View>

      <Text style={styles.title}>{isEditMode ? 'EDIT YOUR JOB' : 'ADD YOUR JOB'}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your job"
        value={newTask}
        onChangeText={setNewTask}
      />
      
      <TouchableOpacity style={styles.submitButton} onPress={handleTaskSubmit}>
        <Text style={styles.submitButtonText}>{isEditMode ? 'Update' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#2D5BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
