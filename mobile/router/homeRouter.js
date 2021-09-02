import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

import TaskListScreen from '../src/screens/TaskListScreen';
import AddTaskScreen from '../src/screens/AddTaskScreen';

const HomeStack = createBottomTabNavigator();

export default function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            initialRouteName="TaskListScreen"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}
        >
            <HomeStack.Screen
                name="TaskListScreen"
                component={TaskListScreen}
                options={({ route }) => ({
                    animationEnabled: true,
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="list-circle" size={30} color={color} />
                    )
                })}
            />
            <HomeStack.Screen
                name="AddTaskScreen"
                component={AddTaskScreen}
                options={({ route }) => ({
                    animationEnabled: true,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={30} color={color} />
                    )
                })}
            />
        </HomeStack.Navigator>
    );
}