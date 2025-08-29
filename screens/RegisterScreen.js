import { useState } from "react";
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function RegisterScreen({navigation})
{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pswd, setPswd] = useState("");
    const [confPswd, setConfPswd] = useState("");
    const [gen, setGender] = useState(null);

    const genders = [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" }
    ];

    const sign_up = async () => {

        if (!name || !email || !pswd || !confPswd || !gen) 
        {
            Alert.alert("Error", "Please fill all fields");
            return;
        }

        if (pswd !== confPswd) 
        {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try
        {
            const uc = await createUserWithEmailAndPassword(auth, email, pswd);
            await updateProfile(uc.user, {displayName: name});
            
            const usersCollectionRef = collection(db, 'users');

            await addDoc(usersCollectionRef, {
                    name: name,
                    email: email,
                    pswd: pswd,
                    gen: gen,
                  });

            setName("");
            setEmail('');
            setPswd("");
            setConfPswd("");

            Alert.alert('Success', "Account created successfully!"); 
            navigation.navigate("Login");
        }

        catch(error)
        {
            Alert.alert("Registration Failed", error.message);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          
        <View>
            <Text style={styles.title}>Register</Text>
            
            <TextInput 
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />


            <Dropdown
              style={styles.dropdown}
              data={genders}
              labelField="label"
              valueField="value"
              placeholder="Select a gender"
              value={gen}
              onChange={item => setGender(item.value)}
            />                        

            <TextInput 
                style={styles.input}
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput 
                style={styles.input}
                placeholder="Password"
                value={pswd}                
                onChangeText={setPswd}
                secureTextEntry
            />

            <TextInput 
                style={styles.input}
                secureTextEntry
                placeholder="Confirm Password"                
                value={confPswd}            
                onChangeText={setConfPswd}                
            />

            <TouchableOpacity style={styles.button} onPress={sign_up}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Already registered ?
                Click <Text style={styles.link} onPress={() => navigation.navigate("Login")}>here</Text> to login
            </Text>
        </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({

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
    marginTop: 20,
    textAlign: "center",
    color: "#555",
  },

  link: {
    color: "#4a90e2",
    fontWeight: "bold",
  },

  dropdown: { 
    height: 50, 
    borderColor: "#ccc", 
    borderWidth: 1, 
    borderRadius: 8, 
    paddingHorizontal: 8,
    marginBottom: 15,
    fontSize: 22
  },

  selected: { 
    marginTop: 20, 
    fontSize: 16 
  },
});