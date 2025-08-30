import { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";



export default function Login({navigation})
{
    const [email, setEmail] = useState("");
    const [psswd, setPsswd] = useState("");

    const sign_in = async () => {

      if (!email || !psswd)
      {
        Alert.alert("Error", "Please enter email and password");
        return;
      }

      try 
      {
        const loginTime = new Date().toISOString();
        await AsyncStorage.setItem("uLT", loginTime);

        await signInWithEmailAndPassword(auth, email, psswd);
        
        Alert.alert("Success", "Logged in successfully!");
        navigation.replace("Home"); // go to Home after login
      } 
      
      catch (error) 
      {
        Alert.alert("Login Error", error.message);
      }
    }

    return (
        <KeyboardAvoidingView style={sgnStyle.container} behavior="padding">
        <View >
            <Text style={sgnStyle.title}>Login</Text>

            <TextInput
                style={sgnStyle.input}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={sgnStyle.input}
                placeholder="Password"
                secureTextEntry
                value={psswd}
                onChangeText={setPsswd}
            />

            <TouchableOpacity onPress={sign_in} style={sgnStyle.button}>
                <Text style={sgnStyle.buttonText}>Login</Text>
            </TouchableOpacity>

            <Text style={{marginTop:-40, marginLeft:150, color:"#4a90e2"}} onPress={() => navigation.navigate("Forgot_Pswd") } >Forgot Password ?</Text>

            <Text style={sgnStyle.footerText}>
                Don't have an account ?
                Click <Text style={sgnStyle.link} onPress={() => navigation.navigate("Register")}>here</Text> to register
            </Text>
        </View>
        </KeyboardAvoidingView>
    );
}


const sgnStyle = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#f9f9f9",
  },


  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#333",
  },


  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    fontSize: 22,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
  },


  button: {
    backgroundColor: "#4a90e2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    width: 100
  },


  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },


  footerText: {
    marginTop: 40,
    textAlign: "center",
    color: "#555",
  },


  link: {
    color: "#4a90e2",
    fontWeight: "bold",
  }
});
