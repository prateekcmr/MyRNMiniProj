import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordScreen({navigation})
{
    const [email, setEmail] = useState("");
    const auth2 = getAuth();

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert("Error", "Please enter your email");
            return;
        }

        try 
        {
            sendPasswordResetEmail(auth2, email).then( () => {
            Alert.alert("Success", "Password reset link sent to your email!");
            navigation.goBack(); // Go back to login
            });
        } 

        catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        }
    };

    return (
    <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
            Forgot Password
        </Text>

      <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleResetPassword}
        style={{
          backgroundColor: "#4CAF50",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Reset Password</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </View>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
});