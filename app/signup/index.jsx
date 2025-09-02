import { useState } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Alert,
    Text,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "expo-router";

const Signup = () => {
    const { color } = useTheme();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSignup = async () => {
        if (password.length < 6) {
            Alert.alert("Error", "Password must be at least 6 characters long");
            return;
        }

        try {
            const response = await fetch("http://10.0.15.100:3000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();
            console.log("Response JSON:", result);

            if (response.ok) {
                Alert.alert("Success", "Account created!", [
                    { text: "OK", onPress: () => router.push("/signin") },
                ]);
            } else {
                // แปลง errors array เป็น string
                const errorMsg = result.errors
                    ? result.errors.map(e => e.msg).join("\n")
                    : result.message || "Signup failed";
                Alert.alert("Error", errorMsg);
            }
        } catch (error) {
            console.error("Network Error:", error);
            Alert.alert("Network Error", "Unable to connect to the server.");
        }
    };



    return (
        <View style={[styles.screen, { backgroundColor: color.background }]}>
            <View style={[styles.container, { backgroundColor: color.surface }]}>
                <Text style={[styles.header, { color: color.text }]}>Create Account</Text>

                <TextInput
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Username"
                    placeholderTextColor={color.textSecondary}
                    style={[styles.input, { color: color.text, borderColor: color.textSecondary }]}
                />
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    placeholderTextColor={color.textSecondary}
                    keyboardType="email-address"
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

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: color.primary }]}
                    onPress={handleSignup}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                {/* <Link href="/signin" style={styles.link}>
                    <Text style={{ color: color.primary }}>Already have an account? Sign In</Text>
                </Link> */}
            </View>
        </View>
    );
};

export default Signup;

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
