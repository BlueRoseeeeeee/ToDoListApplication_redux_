import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { NameContext } from '../App';
import { useDispatch } from 'react-redux';
import { addItemRequest } from '../redux/actions';

export default function Screen3({ navigation, route }) {
    const { name } = useContext(NameContext);
    const [newTask, setNewTask] = useState('');
    const dispatch = useDispatch();
    
    const isEditMode = route.params && route.params.task !== undefined;

    const handleTaskSubmit = () => {
        if (newTask.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        if (isEditMode) {
            dispatch(addItemRequest({ id: route.params.task.id, title: newTask })); 
        } else {
            dispatch(addItemRequest(newTask));
        }

        setNewTask('');
        navigation.goBack();
    };

    useEffect(() => {
        if (isEditMode) {
            setNewTask(route.params.task.title);
        }
    }, [isEditMode, route.params]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10, flex: 1 }}>
                    <Image source={require('../assets/Rectangle.png')} style={{ borderRadius: 25, backgroundColor: '#D9CBF6' }} />
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Hi {name}</Text>
                        <Text style={{ color: '#9095A0', fontWeight: 'bold' }}>Have a great day ahead</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/IconButton12.png')} style={{ marginTop: 10 }} />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{isEditMode ? 'EDIT YOUR JOB' : 'ADD YOUR JOB'}</Text>
            </View>

            <View style={{ flex: 3, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', borderWidth: 1, padding: 10, borderRadius: 8, backgroundColor: 'white', width: '90%' }}>
                    <Image source={require('../assets/Framtask.png')} />
                    <TextInput
                        style={{ width: '80%', marginLeft: 10 }}
                        placeholder="Enter your job"
                        value={newTask}
                        onChangeText={setNewTask}
                    />
                </View>
                <TouchableOpacity style={styles.submitButton} onPress={handleTaskSubmit}>
                    <Text style={styles.submitButtonText}>{isEditMode ? 'Update' : 'Add'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    submitButton: {
        backgroundColor: '#2D5BFF',
        padding: 15,
        borderRadius: 5,
        marginTop: 10,
        width: '90%',
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
