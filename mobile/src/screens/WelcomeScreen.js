import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import Colors from '../../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
    useStatusBar('light-content');

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
                <AppButton
                    title="Register"
                    color="secondary"
                    onPress={() => navigation.navigate('Signup')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: Colors.mediumGrey
    },
    subtitle: {
        fontSize: 28,
        fontWeight: '600',
        paddingVertical: 5,
        color: Colors.primary
    },
    buttonContainer: {
        padding: 20,
        paddingBottom: 60,
        width: '100%'
    }
});