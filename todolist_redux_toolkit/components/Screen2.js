import { Text, SafeAreaView, StyleSheet, View, Image, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { NameContext } from '../App';
import React, { useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, deleteTodo } from '../slices/todoSlice';

export default function Screen2({ navigation }) {
    const { name } = useContext(NameContext);
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.items);
    const [searchText, setSearchText] = useState('');

    // Fetch data from Redux
    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const filteredTasks = todos.filter(item => 
        typeof item.title === 'string' && item.title.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this task?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => dispatch(deleteTodo(id)) }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/IconButton12.png')} style={{ marginTop: 10 }} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                    <Image source={require('../assets/Rectangle.png')} style={{ borderRadius: 25, backgroundColor: '#D9CBF6' }} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Hi {name}</Text>
                        <Text style={{ color: '#9095A0', fontWeight: 'bold' }}>Have a great day ahead</Text>
                    </View>
                </View>
            </View>

            <View style={{ marginBottom: 50, marginTop: 30, alignItems: 'center' }}>
                <TextInput
                    style={{ borderWidth: 1, width: '80%', padding: 10, borderRadius: 5, borderColor: '#9095A0' }}
                    placeholder="Search"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <View style={{ width: '100%', height: '30%' }}>
                <FlatList
                    data={filteredTasks}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <View style={{
                                backgroundColor: '#DEE1E678',
                                borderRadius: 20,
                                marginBottom: 7,
                                padding: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '80%'
                            }}>
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Image source={require('../assets/tick.png')} />
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center' }}>{item.title}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('screen3', { task: item })}>
                                    <Image source={require('../assets/pencil.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>

            <View style={{ flex: 1, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('screen3')}>
                    <Image source={require('../assets/Group13.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
