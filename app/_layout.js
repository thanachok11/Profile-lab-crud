import { Stack, Slot, usePathname } from "expo-router";
import ThemeToggle from "./components/ThemeToggle";
import AuthToggle from "./components/AuthToggle";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

function StackLayout() {
    const { color } = useTheme();
    const pathname = usePathname();

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: color.background,
                },
                headerTintColor: color.text,
                headerTitleStyle: {
                    color: color.text,
                },
                headerTitleAlign: "center",
                // headerLeft: () => <AuthToggle />,
                headerLeft: () => (pathname === "/main" ? <AuthToggle /> : null),
                headerRight: () => <ThemeToggle />,
            }}
        >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="main" options={{ title: "Home" }} />
            <Stack.Screen name="about" options={{ title: "About This Course" }} />
            <Stack.Screen name="book" options={{ title: "Book Collection" }} />
            <Stack.Screen name="book_detail" options={{ title: "Book Detail" }} />

            <Stack.Screen name="signup/index" options={{ title: "Sign Up" }} />
            <Stack.Screen name="signin/index" options={{ title: "Sign In" }} />
            <Stack.Screen name="profile/index" options={{ title: "Profile" }} />
        </Stack>

    );
}
export default function Layout() {
    return (
        <ThemeProvider>
            <StackLayout />
        </ThemeProvider>
    );
}