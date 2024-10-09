import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function Profile() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

                <View style={styles.container}>
                    <Text>Profile</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        padding: 50,
        marginTop: 20
    },
});
