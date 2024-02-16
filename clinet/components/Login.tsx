import React, { useState, useRef, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../context/authProvider';


const LOGIN_URL = 'http://localhost:5000/login';

const Login: React.FC = () => {
    const { setCurrentUser } = useContext(AuthContext)
    const emailRef = useRef<TextInput>(null);
    const errRef = useRef<Text>(null);
    const navigation = useNavigation<any>();
    

    const [email, setEmail] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');


    const handleSubmit = async () => {
        if (!email) {
            setErrMsg('Please enter your email.');
            return;
        }
        const obj = {
            email: email.trim() // Trim any whitespace from the email
        };
        try {
            const resp = await axios.post(
                LOGIN_URL,
                obj,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
            
                });
            console.log(resp?.data);
            const email = resp.data.foundUserByEmail.email
            const selfDepiction = resp.data.foundUserByEmail.selfDepiction
            const id = resp.data.foundUserByEmail._id
            console.log(email, id , selfDepiction);
            
            setCurrentUser({email, selfDepiction, id})
            // Handle authentication logic here
            // For example, you can set authentication token in AsyncStorage
            // or navigate to another screen upon successful authentication
            navigation.navigate('Home'); // Navigate to Home component upon successful authentication
        } catch (err: any) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else {
                setErrMsg("Login Failed");
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text ref={errRef} style={styles.errorText}>{errMsg}</Text>
            <Text style={styles.heading}>Login</Text>
            <TextInput
                ref={emailRef}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                style={styles.input}
                keyboardType="email-address"
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 40,
        backgroundColor: '#007bff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default Login;
