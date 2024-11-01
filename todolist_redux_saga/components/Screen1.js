import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { NameContext } from '../App';

export default function Screen1({ navigation }) {
  const { setName } = useContext(NameContext);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Image95.png")} style={{ width: 200, height: 200, alignSelf: 'center' }} />
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.text1}>MANAGE YOUR</Text>
        <Text style={styles.text1}>TASK</Text>
      </View>
      <View style={styles.nameStyle}>
        <Image source={require("../assets/Frame.png")} />
        <TextInput 
          style={{ paddingHorizontal: 10, color: '#BCC1CA', width: '80%' }} 
          placeholder="Enter your name"
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('screen2')} 
        style={styles.startButton}>
        <Text style={{ textAlign: 'center', color: 'white' }}>GET STARTED -></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: "center",
  },
  text1: {
    fontWeight: 'bold',
    fontSize: 20, 
    color: '#8353E2',
  },
  nameStyle: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5, 
    borderColor: '#9095A0',
    width: "80%",
    padding: 10,
  },
  startButton: {
    backgroundColor: '#00BDD6', 
    padding: 10, 
    borderRadius: 15, 
    width: 150,
  },
});
