import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import AuthStackScreen from "./authRouter";
import HomeStackScreen from "./homeRouter";


const RootStack = createStackNavigator();

const Navigation = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <NavigationContainer>
            <RootStack.Navigator>
                {!isAuthenticated ? (
                    <RootStack.Screen
                        name="Auth"
                        component={AuthStackScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                ) : (
                    <RootStack.Screen
                        name="Home"
                        component={HomeStackScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;