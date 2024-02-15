import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const todosString = await AsyncStorage.getItem('todos');
      const todos = todosString ? JSON.parse(todosString) : [];
      setTodos(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  const addTodo = async () => {
    try {
      const newTodo = { _id: Date.now().toString(), task };
      const updatedTodos = [...todos, newTodo];
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      setTask('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      const updatedTodos = todos.filter(todo => todo._id !== todoId);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      fetchTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  // The return statement remains the same
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.task}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item._id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};


// Styles remain the same


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  todoText: {
    fontSize: 18,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
  },
});


export default App;

//start app with 
//- npx expo --web or
//- for using Gitpod and testing app on smartphone (different network): npx expo --tunnel (enables connecting device/smartphone by using Expo Go App and Scannign QR Code)
//make babel.config.js a json: babel.config.json with content
//  {
//  "presets": ["babel-preset-expo"]
//  }
// npx create-expo-app --template

//Build: 
//expo build:android
//expo install expo-dev-client
//npm install -g eas-cli
//eas build --profile development --platform android
//expo start --dev-client


