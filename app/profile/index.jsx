import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../../context/ThemeContext";

export default function Profile() {
    const { color, isDarkMode } = useTheme();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userString = await AsyncStorage.getItem("user");
            if (userString) {
                setUser(JSON.parse(userString));
            }
        };
        fetchUser();
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: color.background }]}>
            <View
                style={[
                    styles.card,
                    { backgroundColor: isDarkMode ? "#fff" : color.surface },
                ]}
            >
                <Image
                    source={require("../../assets/image/my-avatar.jpg")}
                    style={styles.avatar}
                />
                <Text style={[styles.name, { color: color.primary }]}>
                    {user?.username || "Guest User"}
                </Text>

                <Text style={[styles.email, { color: color.textSecondary }]}>
                    {user?.email || "No email"}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: "90%",
        alignItems: "center",
        padding: 30,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 6,
    },
    email: {
        fontSize: 16,
    },
});
