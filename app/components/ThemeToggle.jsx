import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme, color } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme} activeOpacity={0.7}>
            <View style={[styles.toggleBox, { backgroundColor: color.primary }]}>
                <Text style={[styles.toggleText, { color: color.surface }]}>
                    {isDarkMode ? "Dark Mode" : "Light Mode"}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ThemeToggle;

const styles = StyleSheet.create({
    toggleBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    toggleText: {
        fontWeight: "700",
        fontSize: 14,
    },
});
