import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';
import { SwipeListView } from 'react-native-swipe-list-view';

import Colors from '../../utils/colors';
import SafeView from '../components/SafeView';
import useStatusBar from '../hooks/useStatusBar';
import { getAllTasks, deleteTask, clearError } from '../../redux/actions/taskAction';
import { logout } from '../../redux/actions/authAction';

export default function TaskListScreen({ navigation }) {
    useStatusBar('light-content');

    const dispatch = useDispatch();
    const task = useSelector(state => state.task);
    const taskdata = task.taskdata;

    useEffect(() => {
        getAllTasks()(dispatch);
    }, [navigation])

    useEffect(() => {
        if (task.error) {
            Alert.alert('Error', task.error === 'Unauthorized' ? 'Your session was expired. Please re-login.' : task.error, [
                {
                    text: 'OK', onPress: async () => {
                        if (task.error === 'Unauthorized') {
                            await logout()(dispatch);
                        } else {
                            await clearError()(dispatch);
                        }

                    }
                }
            ]);
        }
    }, [task.error])

    async function onDelete(id) {
        await deleteTask({ id })(dispatch);
    }

    return (
        <SafeView style={styles.container}>
            <SwipeListView
                data={taskdata}
                disableRightSwipe
                renderItem={(data, rowMap) => (
                    <View style={styles.rowFront}>
                        <Text style={styles.title}>{data.item.title.substring(0, 25).concat('...')}</Text>
                        <Text style={styles.content}>{data.item.content.substring(0, 120).concat('...')}</Text>
                        <Text style={styles.date}>{new Date(Number(data.item.date)).toLocaleString()}</Text>
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <TouchableOpacity style={styles.rowBack} onPress={() => onDelete(data.item.id)}>
                        <AntDesign name="delete" size={30} color={Colors.white} />
                    </TouchableOpacity>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
            />
            <Spinner
                visible={task.isLoading}
                color={Colors.primary}
            />
        </SafeView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: Colors.mediumGrey,
        paddingTop: 60
    },
    rowFront: {
        height: 100,
        backgroundColor: Colors.lightGrey,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
        marginBottom: 5
    },
    content: {
        fontSize: 14,
        color: Colors.mediumGrey
    },
    date: {
        fontSize: 10,
        color: Colors.primary,
        position: 'absolute',
        bottom: 5,
        right: 15
    },
    rowBack: {
        height: 100,
        width: 65,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        backgroundColor: Colors.red,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    loadingText: {
        fontSize: 14,
        color: Colors.primary
    }
});