import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, ViewStyle, TextStyle } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import OpenAI from 'openai';


const REGISTER_URL = 'http://localhost:5000/register';



const Register: React.FC = () => {
    
    const emailRef = useRef<TextInput>(null);
    const selfDepictionRef = useRef<TextInput>(null);
    const errRef = useRef<Text>(null);
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState<string>('');
    const [selfDepiction, setSelfDepiction] = useState<string>('');
    const [idealPartnerDepiction, setIdealPartnerDepiction] = useState<string>('')
    //const [validEmail, setValidEmail] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    
    const navigateToLogin = () => {
        navigation.navigate('Login'); // Make sure 'Login' matches the name of your login screen
      };
    

    const handleSubmit = async () => {
       
        try {
            const resp = await axios.post(REGISTER_URL, { email, selfDepiction}, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            console.log(resp);
            setSuccess(true);
            setEmail('');
            setSelfDepiction('');
        } catch (error: any) {
            if (!error.response) {
                setErrMsg("No Server Response");
            } else if (error.response.status === 409) {
                setErrMsg("Email Already Taken");
            } else {
                setErrMsg("Registration Failed");
            }
            if (errRef.current) {
                errRef.current.focus();
            }
        }
    };

    return (
        <View style={styles.container}>
            {success ? (
                <View style={styles.successContainer}>
                    <Text style={styles.successText}>Success!</Text>
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={styles.linkText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.formContainer}>
                    <Text ref={errRef} style={styles.errorText}>{errMsg}</Text>
                    <Text style={styles.heading}>Register</Text>
                    <TextInput
                        ref={emailRef}
                        onChangeText={setEmail}
                        value={email}
                        keyboardType="email-address"
                        placeholder="Email"
                        style={styles.input}
                    />
                    <TextInput
                        ref={selfDepictionRef}
                        onChangeText={text => setSelfDepiction(text.slice(0, 40))}
                        value={selfDepiction}
                        placeholder="Self Depiction (Max 40 characters)"
                        style={[styles.input, styles.textArea]}
                        multiline={true}
                        maxLength={40}

                    />
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={navigateToLogin}>
                        <Text style={styles.linkText}>Already registered? Sign In</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}




const styles: { [key: string]: ViewStyle | TextStyle } = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    formContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    textArea: {
      height: 100, 
      textAlignVertical: 'top', 
    },
    button: {
        width: '100%',
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
    linkText: {
        color: '#007bff',
        fontSize: 16,
        marginTop: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    successContainer: {
        alignItems: 'center',
    },
    successText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
};


export default Register;
