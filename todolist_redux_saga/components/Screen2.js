import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsRequest, deleteItemRequest } from '../redux/actions';
import { NameContext } from '../App';

export default function Screen2({ navigation }) {
  const { name } = React.useContext(NameContext);
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state); 
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchItemsRequest()); 
  }, [dispatch]);

  const deleteTask = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete?');
    if (confirmDelete) {
      dispatch(deleteItemRequest(id));
    }
  };

  const filteredTasks = items.filter(item =>
    typeof item.title === 'string' && item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/IconButton12.png')} style={{ marginTop: 10 }} />
        </TouchableOpacity>
        <View style={styles.greeting}>
          <Image source={require('../assets/Rectangle.png')} style={{ borderRadius: 25, backgroundColor: '#D9CBF6' }} />
          <Text style={styles.greetingText}>Hi {name}</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <TouchableOpacity>
              <Image source={require('../assets/tick.png')} />
            </TouchableOpacity>
            <Text style={styles.taskText}>{item.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => navigation.navigate('screen3', { task: item })} style={{ marginHorizontal: 8 }}>
                <Image source={require('../assets/pencil.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Image source={require('../assets/bin.png')} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        refreshing={loading} // Hiển thị trạng thái loading
        onRefresh={() => dispatch(fetchItemsRequest())} // Cập nhật lại khi kéo xuống
      />

      <TouchableOpacity onPress={() => navigation.navigate('screen3')} style={{ alignItems: 'center' }}>
        <Image source={require('../assets/Group13.png')} />
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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    width: '80%',
    padding: 10,
    borderRadius: 5,
    borderColor: '#9095A0',
    alignSelf: 'center',
    marginVertical: 20,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#DEE1E678',
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
  taskText: {
    textAlign: 'center',
  },
});
