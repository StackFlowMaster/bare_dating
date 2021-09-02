import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Colors from '../../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';
import { login, clearError } from '../../redux/actions/authAction';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Please enter a registered email')
        .email()
        .label('Email'),
    password: Yup.string()
        .required()
        .min(6, 'Password must have at least 6 characters')
        .label('Password')
});

export default function LoginScreen({ navigation }) {
    useStatusBar('light-content');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');

    useEffect(() => {
        if(auth.error) {
            Alert.alert('Error', auth.error, [
                {
                     text: 'OK', onPress: async () => {
                          await clearError()(dispatch);
                     }
                }
           ])
        }
    }, [auth.error])

    function handlePasswordVisibility() {
        if (rightIcon === 'eye') {
            setRightIcon('eye-off');
            setPasswordVisibility(!passwordVisibility);
        } else if (rightIcon === 'eye-off') {
            setRightIcon('eye');
            setPasswordVisibility(!passwordVisibility);
        }
    }

    async function handleOnLogin(values) {
        const { email, password } = values;
        await login({ email, password })(dispatch);
    }

    return (
        <SafeView style={styles.container}>
            <Form
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={values => handleOnLogin(values)}
            >
                <FormField
                    name="email"
                    leftIcon="email"
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                />
                <FormField
                    name="password"
                    leftIcon="lock"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    textContentType="password"
                    rightIcon={rightIcon}
                    handlePasswordVisibility={handlePasswordVisibility}
                />
                <FormButton title={'Login'} style={{ marginTop: 70 }} isLoading={auth.isLoading} />
            </Form>
            <View style={styles.footerButtonContainer}>
                <TouchableOpacity onPress={() => {}}>
                    <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>
            <IconButton
                style={styles.backButton}
                iconName="keyboard-backspace"
                color="#fff"
                size={30}
                onPress={() => navigation.goBack()}
            />
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.mediumGrey,
        paddingTop: 80
    },
    footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600'
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});