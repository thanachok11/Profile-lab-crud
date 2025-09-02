import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useRef } from "react";

const AnimatedCard = ({ children, color }) => {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 0.97,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={[styles.card, { backgroundColor: color.surface, transform: [{ scale }] }]}>
                {children}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const About = () => {
    const { color } = useTheme();

    return (
        <ScrollView style={{ backgroundColor: color.background }}>
            <View style={styles.wrapper}>
                {/* Instructor Card */}
                <AnimatedCard color={color}>
                    <Text style={[styles.cardTitle, { color: color.primary }]}>Instructor</Text>
                    <Image
                        source={require("../assets/image/my-avatar.jpg")}
                        style={styles.avatar}
                    />
                    <Text style={[styles.instructorName, { color: color.text }]}>Boss Thanachok</Text>
                    <Text style={[styles.instructorRole, { color: color.textSecondary }]}>
                        Lecturer, Computer Science Department
                    </Text>
                    <Text style={[styles.description, { color: color.textSecondary, textAlign: "center", marginTop: 6 }]}>
                        Passionate about mobile and web development, always exploring new technologies and building practical projects.
                    </Text>
                </AnimatedCard>

                {/* Course Description Card */}
                <AnimatedCard color={color}>
                    <View style={styles.content}>
                        <Text style={[styles.title, { color: color.text }]}>About This Course</Text>
                        <Text style={[styles.code, { color: color.textSecondary }]}>IN405109 - Hybrid Mobile Application Programming</Text>

                        <Text style={[styles.sectionTitle, { color: color.primary }]}>📘 คำอธิบายรายวิชา (ไทย)</Text>
                        <Text style={[styles.description, { color: color.textSecondary }]}>
                            เรียนรู้การพัฒนาโปรแกรมบนมือถือแบบ cross-platform ด้วยเครื่องมือและภาษาที่หลากหลาย การออกแบบ UI/UX การเข้าถึงฮาร์ดแวร์ การจัดการหน่วยความจำและข้อมูล รวมถึงการทดสอบและความมั่นคงของระบบ
                        </Text>

                        <Text style={[styles.sectionTitle, { color: color.primary }]}>📗 Course Description (English)</Text>
                        <Text style={[styles.description, { color: color.textSecondary }]}>
                            Learn cross-platform mobile application development using various tools and languages, focusing on UI/UX design, hardware access, memory and data management, testing, and security practices.
                        </Text>
                    </View>
                </AnimatedCard>
            </View>
        </ScrollView>
    );
};

export default About;

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 60,
    },
    card: {
        alignItems: "center",
        borderRadius: 14,
        padding: 20,
        marginBottom: 20,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 14,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: "#4a90e2",
        marginBottom: 10,
    },
    instructorName: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 4,
        textAlign: "center",
    },
    instructorRole: {
        fontSize: 14,
        textAlign: "center",
        marginTop: 2,
    },
    content: {
        paddingHorizontal: 6,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
    },
    code: {
        fontSize: 16,
        fontStyle: "italic",
        fontWeight: "500",
        textAlign: "center",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 6,
    },
    description: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: "justify",
    },
});
