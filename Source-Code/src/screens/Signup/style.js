import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    appLogo: {
        width: 100,
        height: 100
    },
    tagline: {
        color: '#2796C3',
        fontWeight: 'bold',
        paddingLeft: 15
    },
    options: {
        marginTop: 100,
        padding: 30,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex'
    },
    loginBox: {
        alignItems: 'center',
        marginTop: 20,
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex'
    },
    profileImg: {
        height: 170,
        width: 170,
        marginTop: 100,
        marginBottom: 50,
        borderWidth: 4,
        borderColor: '#2796C3',
        borderRadius: 100
    },
    profileContainer: {
        alightitems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#2796C3',
        overflow: 'hidden'
    }
})