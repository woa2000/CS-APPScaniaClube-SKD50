import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        borderBottomColor: "#ccc",
        borderBottomWidth: 0.5,
    },
    date:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 12,
        color: '#998FA2'
    },
    buttons:{
        flexDirection: 'row',
    },
    buttonActivity: {
        backgroundColor: '#CEC0D8',
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 50,
        marginRight: 8
    },
    buttonDelete: {
        backgroundColor: '#D90404',
        justifyContent: 'center',
        alignItems: 'center',
        width: 32,
        height: 32,
        borderRadius: 50,
        marginRight: 8
    }
}) 