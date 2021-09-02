import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Colors from '../../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import useStatusBar from '../hooks/useStatusBar';
import { clearError, signup } from '../../redux/actions/authAction';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Please enter a valid email')
        .email()
        .label('Email'),
    password: Yup.string()
        .required()
        .min(6, 'Password must have at least 8 characters')
        .label('Password'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
        .required('Confirm Password is required')
});

export default function SignupScreen({ navigation }) {
    useStatusBar('light-content');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye');
    const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(true);

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

    function handleConfirmPasswordVisibility() {
        if (confirmPasswordIcon === 'eye') {
            setConfirmPasswordIcon('eye-off');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        } else if (confirmPasswordIcon === 'eye-off') {
            setConfirmPasswordIcon('eye');
            setConfirmPasswordVisibility(!confirmPasswordVisibility);
        }
    }

    async function handleOnSignUp(values, actions) {
        const { email, password } = values;
        await signup({ email, password })(dispatch);
    }

    return (
        <SafeView style={styles.container}>
            <Form
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={values => handleOnSignUp(values)}
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
                <FormField
                    name="confirmPassword"
                    leftIcon="lock"
                    placeholder="Confirm password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={confirmPasswordVisibility}
                    textContentType="password"
                    rightIcon={confirmPasswordIcon}
                    handlePasswordVisibility={handleConfirmPasswordVisibility}
                />
                <FormButton title={'Register'} style={{ marginTop: 70 }} isLoading={auth.isLoading} />
            </Form>
            <IconButton
                style={styles.backButton}
                iconName="keyboard-backspace"
                color={Colors.white}
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
        paddingTop: 50
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    }
});