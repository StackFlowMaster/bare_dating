import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Yup from 'yup';
import Spinner from 'react-native-loading-spinner-overlay';

import Colors from '../../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import useStatusBar from '../hooks/useStatusBar';
import { createTask } from '../../redux/actions/taskAction';

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Please type the title.').label('Title'),
    content: Yup.string()
        .required('Please type the content.').label('Content')
});

export default function AddTaskScreen({ navigation }) {
    useStatusBar('light-content');

    const dispatch = useDispatch();
    const task = useSelector(state => state.task);

    async function onAdd(values) {
        const { title, content } = values;
        await createTask({ title, content, date: new Date().getTime().toString() })(dispatch);
    }

    return (
        <SafeView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Form
                        initialValues={{ title: '', content: '' }}
                        validationSchema={validationSchema}
                        onSubmit={values => onAdd(values)}
                    >
                        <FormField
                            name="title"
                            placeholder="Title..."
                        />
                        <FormField
                            multi
                            name="content"
                            placeholder="Content..."
                        />
                        <FormButton title={'Add'} style={{ marginTop: 70 }} />
                    </Form>
                </View>
            </TouchableWithoutFeedback>
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