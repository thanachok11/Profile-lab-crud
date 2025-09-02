import { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    Text,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";

const Signin = () => {
    const { color } = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSignin = async () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Please fill in both fields.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://10.0.15.100:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            setLoading(false);

            if (response.ok) {
                await AsyncStorage.setItem("authToken", result.token);
                await AsyncStorage.setItem("user", JSON.stringify(result.user));
                console.log("Login successful")
                Alert.alert("Success", "Login successful!");
                router.replace("/main")
            } else {
                console.log("Login failed:", result.message);
                Alert.alert("Login Error", result.message || "Invalid credentials.");
            }
        } catch (error) {
            setLoading(false);
            console.error("Network Error:", error);
            Alert.alert("Network Error", "Unable to connect to the server.");
        }
    };

    return (
        <View style={[styles.screen, { backgroundColor: color.background }]}>
            <View style={[styles.container, { backgroundColor: color.surface }]}>
                <Text style={[styles.header, { color: color.text }]}>Welcome Back 👋</Text>

                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={color.textSecondary}
                    style={[styles.input, { color: color.text, borderColor: color.textSecondary }]}
                />
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={color.textSecondary}
                    secureTextEntry
                    style={[styles.input, { color: color.text, borderColor: color.textSecondary }]}
                />

                {loading ? (
                    <ActivityIndicator size="large" color={color.primary} />
                ) : (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: color.primary }]}
                        onPress={handleSignin}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                )}

                <Link href="/signup" style={styles.link}>
                    <Text style={{ color: color.primary }}>Don't have an account? Sign Up</Text>
                </Link>
            </View>
        </View>
    );
};

export default Signin;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    container: {
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 16,
        fontSize: 14,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
    link: {
        marginTop: 20,
        alignSelf: "center",
    },
});
