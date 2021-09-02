import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={styles.header}>
                {
                    this.props.shownBackButton ? (
                        <TouchableOpacity style={{marginLeft: 10 }}
                            onPress={this.props.shownBackButton}
                        >
                            <Ionicons name='ios-arrow-back' size={30} color='white' />
                        </TouchableOpacity>
                    ) : (
                            <TouchableOpacity>
                            </TouchableOpacity>
                        )
                }
                <Text style={styles.headerText}>{this.props.title}</Text>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                {
                    this.props.shownResetButton ? (
                        <TouchableOpacity style={{marginRight: 30 }}
                            onPress={this.props.shownResetButton}
                        >
                            <Text style={{ fontSize: 16, color: 'white', textAlign: 'right' }}>{this.props.resetTitle}</Text>
                        </TouchableOpacity>
                    ) : null
                }
                {
                    this.props.shownSaveButton ? (
                        <TouchableOpacity style={{marginRight: 10 }}
                        onPress={this.props.shownSaveButton}
                        >
                            <Text style={{ fontSize: 16, color: 'white', textAlign: 'right' }}>{this.props.saveTitle}</Text>
                        </TouchableOpacity>
                    ) : null
                }
                </View>
                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'tomato',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingHorizontal: 10
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },
});

