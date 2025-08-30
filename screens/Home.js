// HomeScreen.js

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment/moment";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";


export default function Home({ navigation }) 
{
  const [loggedInTime, setLoggedInTime] = useState(null);

  useEffect(() => {
    const getLoginTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('uLT');
        if (storedTime) {
          setLoggedInTime(moment(storedTime).format('MMMM Do YYYY, h:mm:ss a'));
        }
      } catch (error) {
        console.error('Error retrieving login time:', error);
      }
    };

    getLoginTime();
  }, []);

  const handleLogout = async () => {
    
    try 
    {
      await signOut(auth);
      Alert.alert("Logged out", "See you soon!");
      navigation.replace("Login");
    } 
    
    catch(error) 
    {
      Alert.alert("Logout Error", error.message);
    }
   }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {auth.currentUser?.displayName || "User"} 🎉</Text>
      <Text style={styles.subtitle}>You are logged in as {auth.currentUser?.email}</Text>
      {loggedInTime ? (<Text>Logged in at {loggedInTime}</Text>):(<Text>Login time unavailable</Text>)}
      <Text>{"\n\n"}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f9f9f9" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 30 },
  button: { backgroundColor: "#ff4444", padding: 15, borderRadius: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
